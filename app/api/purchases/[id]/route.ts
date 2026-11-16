import { NextResponse } from "next/server";
import type { QueryResultRow } from "pg";
import { query } from "@/lib/server/db";
import { getSessionUser } from "@/lib/server/session";
import { jsonError } from "@/lib/server/api";

type PurchaseDetail = QueryResultRow & {
  id: string;
  user_id: string;
  asset: string;
  amount_paid: string;
  avx_amount: string;
  status: string;
  tx_hash: string;
  submitted_wallet: string;
  chain_from_address: string | null;
  purchaser_name: string | null;
  purchaser_email: string | null;
  purchaser_country: string | null;
  submitted_at: Date;
  verified_at: Date | null;
  failed_at: Date | null;
  verification_reason: string | null;
  confirmations: number;
  usd_value: string | null;
  price_source: string | null;
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return jsonError("Unauthorized", 401);

  const { id } = await params;

  const result = await query<PurchaseDetail>(
    `SELECT id, user_id, asset, amount_paid::text AS amount_paid,
            avx_amount::text AS avx_amount, status, tx_hash, submitted_wallet,
            chain_from_address, purchaser_name, purchaser_email, purchaser_country,
            submitted_at, verified_at, failed_at, verification_reason, confirmations,
            usd_value::text AS usd_value, price_source
       FROM purchases
      WHERE id = $1`,
    [id],
  );

  const purchase = result.rows[0];
  if (!purchase || purchase.user_id !== user.id) {
    return jsonError("Purchase not found", 404);
  }

  return NextResponse.json({ ok: true, purchase });
}
