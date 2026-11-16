import Decimal from "decimal.js";
import type { QueryResultRow } from "pg";
import { query, withTransaction } from "./db";
import type { VerificationResult } from "./verification";

export type FinalizeOutcome = {
  status: "pending" | "verified" | "failed" | "skipped";
  reason: string;
  purchaseId: string;
};

type StatusRow = QueryResultRow & { id: string; status: string; avx_amount: string };
type CounterRow = QueryResultRow & {
  allocation_avx: string;
  verified_avx_total: string;
};

/**
 * Applies a verification result to the database.
 * Verified allocations are applied atomically with a sale-counter lock.
 */
export async function finalizeVerification(
  purchaseId: string,
  result: VerificationResult,
): Promise<FinalizeOutcome> {
  if (result.status === "pending") {
    await query(
      `UPDATE purchases
          SET verification_reason = $2,
              confirmations = COALESCE($3, confirmations),
              block_number = COALESCE($4, block_number),
              block_hash = COALESCE($5, block_hash),
              last_verify_at = now(),
              verify_attempts = verify_attempts + 1,
              next_verify_at = now() + interval '2 minutes',
              updated_at = now()
        WHERE id = $1 AND status = 'PENDING'`,
      [
        purchaseId,
        result.reason,
        result.confirmations ?? null,
        result.blockNumber ?? null,
        result.blockHash ?? null,
      ],
    );
    return { status: "pending", reason: result.reason, purchaseId };
  }

  if (result.status === "failed") {
    const updated = await query(
      `UPDATE purchases
          SET status = 'FAILED',
              verification_reason = $2,
              confirmations = COALESCE($3, confirmations),
              block_number = COALESCE($4, block_number),
              block_hash = COALESCE($5, block_hash),
              chain_from_address = COALESCE($6, chain_from_address),
              failed_at = now(),
              last_verify_at = now(),
              verify_attempts = verify_attempts + 1,
              updated_at = now()
        WHERE id = $1 AND status = 'PENDING'
        RETURNING id`,
      [
        purchaseId,
        result.reason,
        result.confirmations ?? null,
        result.blockNumber ?? null,
        result.blockHash ?? null,
        result.chainFrom ?? null,
      ],
    );
    if (!updated.rowCount) {
      return { status: "skipped", reason: "already_final", purchaseId };
    }
    return { status: "failed", reason: result.reason, purchaseId };
  }

  return withTransaction(async (client) => {
    const statusResult = await client.query<StatusRow>(
      `SELECT id, status, avx_amount::text AS avx_amount
         FROM purchases WHERE id = $1 FOR UPDATE`,
      [purchaseId],
    );
    const row = statusResult.rows[0];
    if (!row) {
      return { status: "skipped", reason: "not_found", purchaseId };
    }
    if (row.status !== "PENDING") {
      return { status: "skipped", reason: "already_final", purchaseId };
    }

    const counterResult = await client.query<CounterRow>(
      `SELECT allocation_avx::text AS allocation_avx,
              verified_avx_total::text AS verified_avx_total
         FROM sale_counters WHERE id = 1 FOR UPDATE`,
    );
    const counter = counterResult.rows[0];
    const allocation = new Decimal(counter?.allocation_avx ?? "0");
    const total = new Decimal(counter?.verified_avx_total ?? "0");
    const avx = new Decimal(row.avx_amount);

    if (total.plus(avx).gt(allocation)) {
      await client.query(
        `UPDATE purchases
            SET status = 'FAILED',
                verification_reason = 'allocation_exceeded',
                failed_at = now(),
                last_verify_at = now(),
                updated_at = now()
          WHERE id = $1`,
        [purchaseId],
      );
      return { status: "failed", reason: "allocation_exceeded", purchaseId };
    }

    await client.query(
      `UPDATE purchases
          SET status = 'VERIFIED',
              verification_reason = 'ok',
              confirmations = COALESCE($2, confirmations),
              block_number = COALESCE($3, block_number),
              block_hash = COALESCE($4, block_hash),
              block_timestamp = COALESCE($5, block_timestamp),
              chain_from_address = COALESCE($6, chain_from_address),
              onchain_amount = $7,
              verified_at = now(),
              last_verify_at = now(),
              verify_attempts = verify_attempts + 1,
              updated_at = now()
        WHERE id = $1 AND status = 'PENDING'`,
      [
        purchaseId,
        result.confirmations ?? null,
        result.blockNumber ?? null,
        result.blockHash ?? null,
        result.blockTimestamp ?? null,
        result.chainFrom ?? null,
        result.onchainAmount ?? null,
      ],
    );

    await client.query(
      `UPDATE sale_counters
          SET verified_avx_total = verified_avx_total + $1,
              updated_at = now()
        WHERE id = 1`,
      [row.avx_amount],
    );

    return { status: "verified", reason: "ok", purchaseId };
  });
}
