import { NextResponse } from "next/server";
import type { QueryResultRow } from "pg";
import { withTransaction } from "@/lib/server/db";
import { hashPassword } from "@/lib/server/auth";
import { createSession, setSessionCookie } from "@/lib/server/session";
import { signupCompleteSchema } from "@/lib/server/validation";
import {
  hashSignupCode,
  SIGNUP_CODE_MAX_ATTEMPTS,
} from "@/lib/server/signup-codes";
import {
  clientIp,
  isSecureRequest,
  jsonError,
  readJson,
  sameOrigin,
} from "@/lib/server/api";
import { rateLimit } from "@/lib/server/rate-limit";

type CodeRow = QueryResultRow & {
  id: string;
  code_hash: string;
  expires_at: Date;
  attempts: number;
};

type UserIdRow = QueryResultRow & { id: string };

type Outcome =
  | { outcome: "ok"; userId: string }
  | { outcome: "invalid" }
  | { outcome: "expired" }
  | { outcome: "too_many" }
  | { outcome: "conflict" };

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);

  const limit = rateLimit(
    `signup-complete:${clientIp(request)}`,
    10,
    10 * 60_000,
  );
  if (!limit.ok) {
    return jsonError("Too many attempts. Try again later.", 429);
  }

  const parsed = signupCompleteSchema.safeParse(await readJson(request));
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
  }

  const { email, code, password } = parsed.data;

  const result = await withTransaction<Outcome>(async (client) => {
    const codeResult = await client.query<CodeRow>(
      `SELECT id, code_hash, expires_at, attempts
         FROM signup_codes
        WHERE lower(email) = lower($1) AND consumed_at IS NULL
        ORDER BY created_at DESC
        LIMIT 1
        FOR UPDATE`,
      [email],
    );

    const row = codeResult.rows[0];
    if (!row) return { outcome: "invalid" };

    if (row.attempts >= SIGNUP_CODE_MAX_ATTEMPTS) {
      await client.query(
        "UPDATE signup_codes SET consumed_at = now() WHERE id = $1",
        [row.id],
      );
      return { outcome: "too_many" };
    }

    if (new Date(row.expires_at).getTime() <= Date.now()) {
      await client.query(
        "UPDATE signup_codes SET consumed_at = now() WHERE id = $1",
        [row.id],
      );
      return { outcome: "expired" };
    }

    if (hashSignupCode(email, code) !== row.code_hash) {
      await client.query(
        "UPDATE signup_codes SET attempts = attempts + 1 WHERE id = $1",
        [row.id],
      );
      return { outcome: "invalid" };
    }

    const existing = await client.query(
      "SELECT id FROM users WHERE lower(email) = lower($1)",
      [email],
    );
    if (existing.rowCount) {
      await client.query(
        "UPDATE signup_codes SET consumed_at = now() WHERE id = $1",
        [row.id],
      );
      return { outcome: "conflict" };
    }

    const passwordHash = await hashPassword(password);
    const inserted = await client.query<UserIdRow>(
      `INSERT INTO users (email, password_hash, email_verified_at)
       VALUES ($1, $2, now())
       RETURNING id`,
      [email, passwordHash],
    );

    await client.query(
      "UPDATE signup_codes SET consumed_at = now() WHERE id = $1",
      [row.id],
    );

    return { outcome: "ok", userId: inserted.rows[0].id };
  });

  if (result.outcome === "invalid") {
    return jsonError("Invalid or expired code", 400);
  }
  if (result.outcome === "expired") {
    return jsonError("This code has expired. Request a new one.", 400);
  }
  if (result.outcome === "too_many") {
    return jsonError("Too many incorrect attempts. Request a new code.", 429);
  }
  if (result.outcome === "conflict") {
    return jsonError("Email already registered. Please log in.", 409);
  }

  const { token, expiresAt } = await createSession(result.userId);
  const response = NextResponse.json(
    { ok: true, message: "Account created.", emailVerified: true },
    { status: 201 },
  );
  setSessionCookie(response, token, expiresAt, isSecureRequest(request));
  return response;
}
