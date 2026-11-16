import type { QueryResultRow } from "pg";
import {
  createPublicClient,
  http,
  type Hash,
  type Transaction,
  type TransactionReceipt,
} from "viem";
import { bsc } from "viem/chains";
import { fromBaseUnits, toBaseUnits } from "./amounts";
import { chainConfig, decimalsFor, tokenAddressFor } from "./chain-config";
import type { PaymentAsset } from "./chain-config";

const TRANSFER_TOPIC =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

const client = createPublicClient({
  chain: bsc,
  transport: http(chainConfig.rpcUrl, { timeout: 15_000, retryCount: 1 }),
});

export type VerificationPurchaseRow = QueryResultRow & {
  id: string;
  asset: PaymentAsset;
  amount_paid: string;
  submitted_wallet: string;
  tx_hash: string;
  token_contract: string | null;
  avx_amount: string;
};

export type VerificationResult = {
  status: "pending" | "verified" | "failed";
  reason: string;
  confirmations?: number;
  blockNumber?: bigint;
  blockHash?: string;
  blockTimestamp?: Date;
  chainFrom?: string;
  onchainAmount?: string;
};

function topicToAddress(topic: string): string {
  return `0x${topic.slice(26)}`.toLowerCase();
}

function isNotFoundError(error: unknown): boolean {
  return (
    error instanceof Error &&
    /not\s*found/i.test(`${error.name} ${error.message}`)
  );
}

/** Read-only on-chain verification for BNB / USDT / USDC. */
export async function verifyOnChain(
  purchase: VerificationPurchaseRow,
): Promise<VerificationResult> {
  try {
    const chainId = await client.getChainId();
    if (chainId !== chainConfig.chainId) {
      return { status: "failed", reason: `chain_mismatch:${chainId}` };
    }
  } catch (error) {
    console.error("RPC chain id check failed", error);
    return { status: "pending", reason: "transient_rpc_error" };
  }

  let receipt: TransactionReceipt;
  let tx: Transaction;
  let latestBlock: bigint;

  try {
    receipt = await client.getTransactionReceipt({
      hash: purchase.tx_hash as Hash,
    });
    tx = await client.getTransaction({ hash: purchase.tx_hash as Hash });
    latestBlock = await client.getBlockNumber();
  } catch (error) {
    if (isNotFoundError(error)) {
      return { status: "pending", reason: "transaction_not_found" };
    }
    console.error("RPC transaction lookup failed", error);
    return { status: "pending", reason: "transient_rpc_error" };
  }

  if (!receipt || !tx) {
    return { status: "pending", reason: "transaction_not_found" };
  }

  const base = {
    blockNumber: tx.blockNumber ?? undefined,
    blockHash: tx.blockHash ?? undefined,
    chainFrom: tx.from.toLowerCase(),
  };

  if (receipt.status !== "success") {
    return { status: "failed", reason: "transaction_reverted", ...base };
  }

  if (tx.blockNumber === null) {
    return { status: "pending", reason: "transaction_not_mined", ...base };
  }

  const confirmations = Number(latestBlock - tx.blockNumber + BigInt(1));
  base.blockNumber = tx.blockNumber;

  let blockTimestamp: Date | undefined;
  try {
    const block = await client.getBlock({ blockNumber: tx.blockNumber });
    blockTimestamp = new Date(Number(block.timestamp) * 1000);
  } catch {
    // Block timestamp is non-critical for verification.
  }

  const withMeta = { ...base, confirmations, blockTimestamp };

  if (confirmations < chainConfig.confirmations) {
    return {
      status: "pending",
      reason: `awaiting_confirmations:${confirmations}/${chainConfig.confirmations}`,
      ...withMeta,
    };
  }

  if (tx.from.toLowerCase() !== purchase.submitted_wallet.toLowerCase()) {
    return { status: "failed", reason: "wallet_mismatch", ...withMeta };
  }

  const decimals = decimalsFor(purchase.asset);
  const expectedAmount = toBaseUnits(purchase.amount_paid, decimals);

  if (expectedAmount <= BigInt(0)) {
    return { status: "failed", reason: "amount_too_small", ...withMeta };
  }

  if (purchase.asset === "BNB") {
    if ((tx.to ?? "").toLowerCase() !== chainConfig.treasuryAddress) {
      return { status: "failed", reason: "wrong_recipient", ...withMeta };
    }
    if (tx.value !== expectedAmount) {
      return {
        status: "failed",
        reason: `amount_mismatch:${tx.value.toString()}/${expectedAmount.toString()}`,
        ...withMeta,
      };
    }
    return {
      status: "verified",
      reason: "ok",
      ...withMeta,
      onchainAmount: fromBaseUnits(tx.value, 18),
    };
  }

  const expectedToken = tokenAddressFor(purchase.asset);
  if (!expectedToken) {
    return { status: "failed", reason: "token_not_configured", ...withMeta };
  }

  const tokenLogs = receipt.logs.filter(
    (log) =>
      log.address.toLowerCase() === expectedToken &&
      log.topics[0] === TRANSFER_TOPIC,
  );

  if (tokenLogs.length === 0) {
    return { status: "failed", reason: "wrong_token_contract", ...withMeta };
  }

  const toTreasury = tokenLogs.filter(
    (log) =>
      log.topics[2] &&
      topicToAddress(log.topics[2]) === chainConfig.treasuryAddress,
  );
  if (toTreasury.length === 0) {
    return { status: "failed", reason: "wrong_recipient", ...withMeta };
  }

  const fromWallet = toTreasury.filter(
    (log) =>
      log.topics[1] &&
      topicToAddress(log.topics[1]) ===
        purchase.submitted_wallet.toLowerCase(),
  );
  if (fromWallet.length === 0) {
    return { status: "failed", reason: "wallet_mismatch", ...withMeta };
  }

  const match = fromWallet.find(
    (log) => log.data && BigInt(log.data) === expectedAmount,
  );
  if (!match) {
    return {
      status: "failed",
      reason: `amount_mismatch:${fromWallet[0]?.data}/${expectedAmount.toString()}`,
      ...withMeta,
    };
  }

  return {
    status: "verified",
    reason: "ok",
    ...withMeta,
    onchainAmount: fromBaseUnits(expectedAmount, decimals),
  };
}
