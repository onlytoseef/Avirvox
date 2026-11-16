import Decimal from "decimal.js";

/**
 * Converts a human decimal amount (e.g. "1.5") into smallest units (bigint).
 * Uses decimal.js only — never floating point.
 */
export function toBaseUnits(amount: string, decimals: number): bigint {
  const fixed = new Decimal(amount)
    .toDecimalPlaces(decimals, Decimal.ROUND_DOWN)
    .toFixed(decimals);
  const [whole, fraction = ""] = fixed.split(".");
  return BigInt(`${whole}${fraction.padEnd(decimals, "0").slice(0, decimals)}`);
}

/** Converts smallest units (bigint) back to a human decimal string. */
export function fromBaseUnits(value: bigint, decimals: number): string {
  const negative = value < BigInt(0);
  const absolute = negative ? -value : value;
  const digits = absolute.toString().padStart(decimals + 1, "0");
  const whole = digits.slice(0, digits.length - decimals) || "0";
  const fraction = digits.slice(digits.length - decimals).replace(/0+$/, "");
  return `${negative ? "-" : ""}${whole}${fraction ? `.${fraction}` : ""}`;
}

/** USD value of an amount at a given unit price (decimal string). */
export function toUsdValue(amount: string, priceUsd: string): string {
  return new Decimal(amount).mul(priceUsd).toFixed(18);
}
