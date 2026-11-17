import { connection, NextResponse } from "next/server";
import Decimal from "decimal.js";
import type { QueryResultRow } from "pg";
import { query } from "@/lib/server/db";
import { saleConfig } from "@/lib/server/sale-config";
import { fetchAssetPrices } from "@/lib/server/pricing";

type CounterRow = QueryResultRow & {
  allocation_avx: string;
  remaining_avx: string;
  verified_avx: string;
};

function formatAvx(value: string): string {
  try {
    const rounded = new Decimal(value)
      .toDecimalPlaces(0, Decimal.ROUND_DOWN)
      .toFixed(0);
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(Number(rounded));
  } catch {
    return value;
  }
}

export async function GET() {
  await connection();

  let allocationAvx = saleConfig.allocationAvx;
  let remainingAvx = saleConfig.allocationAvx;
  let verifiedAvx = "0";
  let counterError: string | null = null;

  try {
    const result = await query<CounterRow>(
      `SELECT allocation_avx::text AS allocation_avx,
              (allocation_avx - verified_avx_total)::text AS remaining_avx,
              verified_avx_total::text AS verified_avx
         FROM sale_counters
        WHERE id = 1`,
    );
    const row = result.rows[0];
    if (row) {
      allocationAvx = row.allocation_avx;
      remainingAvx = row.remaining_avx;
      verifiedAvx = row.verified_avx;
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
      // Raw numeric strings (for calculations)
      allocationAvx,
      remainingAvx,
      verifiedAvx,
      // Display strings with thousands separators, e.g. 500,000,000
      allocationAvxFormatted: formatAvx(allocationAvx),
      remainingAvxFormatted: formatAvx(remainingAvx),
      verifiedAvxFormatted: formatAvx(verifiedAvx),
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
