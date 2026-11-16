import { after, NextResponse } from "next/server";
import type { QueryResultRow } from "pg";
import { query } from "@/lib/server/db";
import { computeAvxAmount, fetchAssetPrices } from "@/lib/server/pricing";
import { isSaleOpen, saleConfig } from "@/lib/server/sale-config";
import { chainConfig, tokenAddressFor } from "@/lib/server/chain-config";
import { toUsdValue } from "@/lib/server/amounts";
import { purchaseSchema } from "@/lib/server/validation";
import { getSessionUser } from "@/lib/server/session";
import { afterPurchaseSubmitted } from "@/lib/server/purchase-service";
import { clientIp, jsonError, readJson, sameOrigin } from "@/lib/server/api";
import { rateLimit } from "@/lib/server/rate-limit";

type InsertedPurchase = QueryResultRow & {
  id: string;
  status: string;
  avx_amount: string;
  submitted_at: Date;
};

type PurchaseListItem = QueryResultRow & {
  id: string;
  asset: string;
  amount_paid: string;
  avx_amount: string;
  status: string;
  tx_hash: string;
  submitted_wallet: string;
  purchaser_name: string | null;
  purchaser_email: string | null;
  purchaser_country: string | null;
  submitted_at: Date;
  verified_at: Date | null;
  verification_reason: string | null;
  confirmations: number;
  usd_value: string | null;
  price_source: string | null;
};

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);

  const user = await getSessionUser();
  if (!user) return jsonError("Unauthorized", 401);
  if (!user.emailVerified) return jsonError("Email verification required", 403);

  const limit = rateLimit(
    `purchase:${user.id}:${clientIp(request)}`,
    10,
    10 * 60_000,
  );
  if (!limit.ok) return jsonError("Too many attempts. Try again later.", 429);

  if (!isSaleOpen()) return jsonError("The presale is closed", 403);

  const parsed = purchaseSchema.safeParse(await readJson(request));
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
  }

  const input = parsed.data;

  const duplicate = await query("SELECT id FROM purchases WHERE tx_hash = $1", [
    input.txHash,
  ]);
  if (duplicate.rowCount) {
    return jsonError("This transaction hash has already been submitted", 409);
  }

  let prices;
  try {
    prices = await fetchAssetPrices();
  } catch (error) {
    console.error("Price fetch failed during purchase submission", error);
    return jsonError("Live pricing is temporarily unavailable. Try again shortly.", 503);
  }

  const assetUsdPrice = prices.prices[input.asset];
  const avxAmount = computeAvxAmount(input.amountPaid, assetUsdPrice);
  const usdValue = toUsdValue(input.amountPaid, assetUsdPrice);
  const tokenContract = tokenAddressFor(input.asset);

  let purchase: InsertedPurchase;
  try {
    const inserted = await query<InsertedPurchase>(
      `INSERT INTO purchases (
         user_id, asset, amount_paid, avx_amount, price_usd,
         asset_usd_price, usd_value, price_source, price_fetched_at,
         submitted_wallet, tx_hash, treasury_address, token_contract, chain_id,
         status, purchaser_name, purchaser_email, purchaser_country,
         next_verify_at, submitted_at, updated_at
       ) VALUES (
         $1, $2, $3, $4, $5,
         $6, $7, $8, $9,
         $10, $11, $12, $13, $14,
         'PENDING', $15, $16, $17,
         now(), now(), now()
       )
       RETURNING id, status, avx_amount::text AS avx_amount, submitted_at`,
      [
        user.id,
        input.asset,
        input.amountPaid,
        avxAmount,
        saleConfig.priceUsd,
        assetUsdPrice,
        usdValue,
        prices.source,
        prices.fetchedAt,
        input.walletAddress,
        input.txHash,
        chainConfig.treasuryAddress,
        tokenContract,
        chainConfig.chainId,
        input.name,
        input.email,
        input.country,
      ],
    );
    purchase = inserted.rows[0];
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return jsonError("This transaction hash has already been submitted", 409);
    }
    throw error;
  }

  after(async () => {
    await afterPurchaseSubmitted(purchase.id);
  });

  return NextResponse.json(
    {
      ok: true,
      purchase: {
        id: purchase.id,
        status: purchase.status,
        asset: input.asset,
        amountPaid: input.amountPaid,
        estimatedAvx: purchase.avx_amount,
        txHash: input.txHash,
        submittedAt: purchase.submitted_at,
      },
    },
    { status: 201 },
  );
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return jsonError("Unauthorized", 401);

  const result = await query<PurchaseListItem>(
    `SELECT id, asset, amount_paid::text AS amount_paid,
            avx_amount::text AS avx_amount, status, tx_hash, submitted_wallet,
            purchaser_name, purchaser_email, purchaser_country,
            submitted_at, verified_at, verification_reason, confirmations,
            usd_value::text AS usd_value, price_source
       FROM purchases
      WHERE user_id = $1
      ORDER BY submitted_at DESC`,
    [user.id],
  );

  return NextResponse.json({ ok: true, purchases: result.rows });
}
