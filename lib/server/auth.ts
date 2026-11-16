import { createHash, randomBytes } from "node:crypto";
import { hash, verify } from "@node-rs/argon2";

/** Hash a password using Argon2id (the @node-rs/argon2 default). */
export function hashPassword(password: string): Promise<string> {
  return hash(password, {
    memoryCost: 19_456,
    timeCost: 2,
    parallelism: 1,
  });
}

export function verifyPassword(
  passwordHash: string,
  password: string,
): Promise<boolean> {
  return verify(passwordHash, password);
}

/** Generates a URL-safe opaque token. */
export function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString("hex");
}

/** Deterministic hash for storing tokens at rest. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
