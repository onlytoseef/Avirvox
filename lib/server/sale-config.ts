/**
 * Public presale configuration — single source of truth for the API.
 * Values are env-overridable but default to the confirmed client requirements.
 */
export const saleConfig = {
  priceUsd: process.env.AVX_PRICE_USD ?? "0.030",
  allocationAvx: process.env.SALE_ALLOCATION_AVX ?? "500000000",
  closesAt: process.env.SALE_CLOSES_AT ?? "2027-02-28T23:59:59.000Z",
  chainId: Number(process.env.CHAIN_ID ?? "56"),
  currencies: ["BNB", "USDT", "USDC"] as const,
  treasuryAddress:
    process.env.TREASURY_WALLET_ADDRESS ??
    "0xCC253A1c99ca482AB697cc0828660BF28a52E3A1",
  avxContractAddress:
    process.env.AVX_TOKEN_CONTRACT_ADDRESS ??
    "0x4727d9A390Aa7bc001C52E4b1E9c9D990F12E99b",
} as const;

export type SaleConfig = typeof saleConfig;

export function isSaleOpen(now: Date = new Date()): boolean {
  return now.getTime() <= new Date(saleConfig.closesAt).getTime();
}
