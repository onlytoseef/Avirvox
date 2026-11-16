import Decimal from "decimal.js";
import { saleConfig } from "./sale-config";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,tether,usd-coin&vs_currencies=usd";

export type AssetPrices = {
  source: string;
  fetchedAt: string;
  prices: {
    BNB: string;
    USDT: string;
    USDC: string;
  };
};

type CoinGeckoResponse = {
  binancecoin?: { usd?: number };
  tether?: { usd?: number };
  "usd-coin"?: { usd?: number };
};

let cache: { value: AssetPrices; expiresAt: number } | null = null;
const CACHE_MS = 60_000;

/** Fetches live BNB / USDT / USDC prices in USD (CoinGecko, 60s cache). */
export async function fetchAssetPrices(): Promise<AssetPrices> {
  if (cache && cache.expiresAt > Date.now()) return cache.value;

  const headers: Record<string, string> = { accept: "application/json" };
  if (process.env.COINGECKO_API_KEY) {
    headers["x-cg-demo-api-key"] = process.env.COINGECKO_API_KEY;
  }

  const response = await fetch(COINGECKO_URL, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`CoinGecko request failed (${response.status})`);
  }

  const data = (await response.json()) as CoinGeckoResponse;
  const bnb = data.binancecoin?.usd;
  const usdt = data.tether?.usd;
  const usdc = data["usd-coin"]?.usd;

  if (
    typeof bnb !== "number" ||
    typeof usdt !== "number" ||
    typeof usdc !== "number"
  ) {
    throw new Error("CoinGecko response missing expected prices");
  }

  const value: AssetPrices = {
    source: "coingecko:simple",
    fetchedAt: new Date().toISOString(),
    prices: {
      BNB: new Decimal(String(bnb)).toFixed(8),
      USDT: new Decimal(String(usdt)).toFixed(8),
      USDC: new Decimal(String(usdc)).toFixed(8),
    },
  };

  cache = { value, expiresAt: Date.now() + CACHE_MS };
  return value;
}

/**
 * Computes the AVX amount for a payment.
 * All arithmetic uses decimal.js; never JS floats.
 */
export function computeAvxAmount(
  amountPaid: string,
  assetUsdPrice: string,
  precision = 18,
): string {
  const usd = new Decimal(amountPaid).mul(assetUsdPrice);
  return usd
    .div(saleConfig.priceUsd)
    .toDecimalPlaces(precision, Decimal.ROUND_DOWN)
    .toFixed(precision);
}
