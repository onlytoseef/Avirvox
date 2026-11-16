export function normalizeAddress(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidAddress(value: string): boolean {
  return /^0x[0-9a-f]{40}$/.test(value);
}

export function normalizeTxHash(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidTxHash(value: string): boolean {
  return /^0x[0-9a-f]{64}$/.test(value);
}
