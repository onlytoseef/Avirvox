import { after, NextResponse } from "next/server";
import { query } from "@/lib/server/db";
import { finalizeVerification } from "@/lib/server/finalize";
import { verifyOnChain, type VerificationPurchaseRow } from "@/lib/server/verification";
import { afterPurchaseFinalized } from "@/lib/server/purchase-service";
import { getSessionUser } from "@/lib/server/session";
import { jsonError, sameOrigin } from "@/lib/server/api";
import { rateLimit } from "@/lib/server/rate-limit";

type OwnedPurchase = VerificationPurchaseRow & {
  user_id: string;
  status: string;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);

  const user = await getSessionUser();
  if (!user) return jsonError("Unauthorized", 401);
  if (!user.emailVerified) return jsonError("Email verification required", 403);

  const { id } = await params;

  const limit = rateLimit(`verify:${user.id}`, 20, 10 * 60_000);
  if (!limit.ok) return jsonError("Too many attempts. Try again later.", 429);

  const result = await query<OwnedPurchase>(
    `SELECT id, user_id, status, asset, amount_paid::text AS amount_paid,
            submitted_wallet, tx_hash, token_contract, avx_amount::text AS avx_amount
       FROM purchases WHERE id = $1`,
    [id],
  );
  const purchase = result.rows[0];
  if (!purchase || purchase.user_id !== user.id) {
    return jsonError("Purchase not found", 404);
  }

  if (purchase.status !== "PENDING") {
    return NextResponse.json({
      ok: true,
      status: purchase.status,
      reason: "already_final",
    });
  }

  const verified = await verifyOnChain(purchase);
  const outcome = await finalizeVerification(purchase.id, verified);

  if (outcome.status === "verified" || outcome.status === "failed") {
    after(async () => {
      await afterPurchaseFinalized(purchase.id);
    });
  }

  return NextResponse.json({
    ok: true,
    status: outcome.status,
    reason: outcome.reason,
  });
}
