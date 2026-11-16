import { NextResponse } from "next/server";
import type { QueryResultRow } from "pg";
import { query } from "@/lib/server/db";
import { finalizeVerification } from "@/lib/server/finalize";
import { verifyOnChain, type VerificationPurchaseRow } from "@/lib/server/verification";
import { afterPurchaseFinalized } from "@/lib/server/purchase-service";
import { retryNotifications } from "@/lib/server/notifications";
import { syncPurchaseToSheet } from "@/lib/server/sheets";
import { jsonError } from "@/lib/server/api";

type IdRow = QueryResultRow & { id: string };

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("x-cron-secret") !== secret) {
    return jsonError("Unauthorized", 401);
  }

  const pending = await query<VerificationPurchaseRow>(
    `SELECT id, asset, amount_paid::text AS amount_paid, submitted_wallet,
            tx_hash, token_contract, avx_amount::text AS avx_amount
       FROM purchases
      WHERE status = 'PENDING' AND next_verify_at <= now()
      ORDER BY submitted_at ASC
      LIMIT 20`,
  );

  const results: { id: string; status: string; reason: string }[] = [];

  for (const purchase of pending.rows) {
    const verified = await verifyOnChain(purchase);
    const outcome = await finalizeVerification(purchase.id, verified);
    if (outcome.status === "verified" || outcome.status === "failed") {
      await afterPurchaseFinalized(purchase.id);
    }
    results.push({
      id: purchase.id,
      status: outcome.status,
      reason: outcome.reason,
    });
  }

  const unsynced = await query<IdRow>(
    `SELECT id FROM purchases
      WHERE sheet_synced_at IS NULL AND sheet_sync_attempts < 5
      ORDER BY submitted_at ASC
      LIMIT 10`,
  );
  for (const row of unsynced.rows) {
    await syncPurchaseToSheet(row.id);
  }

  await retryNotifications();

  return NextResponse.json({ ok: true, processed: results.length, results });
}
