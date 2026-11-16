import { connection, NextResponse } from "next/server";
import type { QueryResultRow } from "pg";
import { query } from "@/lib/server/db";
import { saleConfig } from "@/lib/server/sale-config";
import { fetchAssetPrices } from "@/lib/server/pricing";

type CounterRow = QueryResultRow & {
  allocation_avx: string;
  remaining_avx: string;
};

export async function GET() {
  await connection();

  let allocationAvx = saleConfig.allocationAvx;
  let remainingAvx = saleConfig.allocationAvx;
  let counterError: string | null = null;

  try {
    const result = await query<CounterRow>(
      `SELECT allocation_avx::text AS allocation_avx,
              (allocation_avx - verified_avx_total)::text AS remaining_avx
         FROM sale_counters
        WHERE id = 1`,
    );
    const row = result.rows[0];
    if (row) {
      allocationAvx = row.allocation_avx;
      remainingAvx = row.remaining_avx;
    }
  } catch (error) {
    console.error("Failed to read sale counter", error);
    counterError = "unavailable";
  }

  let prices = null;
  let priceSource: string | null = null;
  let pricesFetchedAt: string | null = null;
  let priceError: string | null = null;

  try {
    const result = await fetchAssetPrices();
    prices = result.prices;
    priceSource = result.source;
    pricesFetchedAt = result.fetchedAt;
  } catch (error) {
    console.error("Failed to fetch asset prices", error);
    priceError = "temporarily_unavailable";
  }

  return NextResponse.json({
    ok: true,
    sale: {
      priceUsd: saleConfig.priceUsd,
      allocationAvx,
      remainingAvx,
      closesAt: saleConfig.closesAt,
      chainId: saleConfig.chainId,
      currencies: saleConfig.currencies,
      treasuryAddress: saleConfig.treasuryAddress,
      avxContractAddress: saleConfig.avxContractAddress,
    },
    prices,
    priceSource,
    pricesFetchedAt,
    priceError,
    counterError,
  });
}
