import { createHash, randomInt } from "node:crypto";

export const SIGNUP_CODE_TTL_MINUTES = 10;
export const SIGNUP_CODE_MAX_ATTEMPTS = 5;

function pepper(): string {
  return (
    process.env.EMAIL_CODE_PEPPER ??
    process.env.CRON_SECRET ??
    "avirvox-labs-dev"
  );
}

/** Generates a 6-digit numeric code (leading zeros preserved). */
export function generateSignupCode(): string {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

/** Hashes a code bound to the email address and a server-side pepper. */
export function hashSignupCode(email: string, code: string): string {
  return createHash("sha256")
    .update(`${email.trim().toLowerCase()}:${code}:${pepper()}`)
    .digest("hex");
}
