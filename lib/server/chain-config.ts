export type PaymentAsset = "BNB" | "USDT" | "USDC";

export const chainConfig = {
  rpcUrl: process.env.BSC_RPC_URL ?? "https://bsc-dataseed.binance.org",
  chainId: Number(process.env.CHAIN_ID ?? "56"),
  treasuryAddress: (
    process.env.TREASURY_WALLET_ADDRESS ??
    "0xCC253A1c99ca482AB697cc0828660BF28a52E3A1"
  ).toLowerCase(),
  usdtAddress: (
    process.env.USDT_CONTRACT_ADDRESS ??
    "0x55d398326f99059fF775485246999027B3197955"
  ).toLowerCase(),
  usdcAddress: (
    process.env.USDC_CONTRACT_ADDRESS ??
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
  ).toLowerCase(),
  usdtDecimals: Number(process.env.USDT_DECIMALS ?? "18"),
  usdcDecimals: Number(process.env.USDC_DECIMALS ?? "18"),
  confirmations: Number(process.env.REQUIRED_CONFIRMATIONS ?? "12"),
  pendingExpiryDays: Number(process.env.PENDING_EXPIRY_DAYS ?? "7"),
} as const;

export function tokenAddressFor(asset: PaymentAsset): string | null {
  if (asset === "USDT") return chainConfig.usdtAddress;
  if (asset === "USDC") return chainConfig.usdcAddress;
  return null;
}

export function decimalsFor(asset: PaymentAsset): number {
  if (asset === "USDT") return chainConfig.usdtDecimals;
  if (asset === "USDC") return chainConfig.usdcDecimals;
  return 18;
}
