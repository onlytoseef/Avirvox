import { NextResponse } from "next/server";
import type { QueryResultRow } from "pg";
import { query } from "@/lib/server/db";
import { signupStartSchema } from "@/lib/server/validation";
import {
  generateSignupCode,
  hashSignupCode,
  SIGNUP_CODE_TTL_MINUTES,
} from "@/lib/server/signup-codes";
import { sendSignupCodeEmail } from "@/lib/server/email";
import { clientIp, jsonError, readJson, sameOrigin } from "@/lib/server/api";
import { rateLimit } from "@/lib/server/rate-limit";

type CountRow = QueryResultRow & { count: string };

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);

  const limit = rateLimit(`signup-start:${clientIp(request)}`, 5, 10 * 60_000);
  if (!limit.ok) {
    return jsonError("Too many attempts. Try again later.", 429);
  }

  const parsed = signupStartSchema.safeParse(await readJson(request));
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
  }

  const email = parsed.data.email;

  const existing = await query(
    "SELECT id FROM users WHERE lower(email) = lower($1)",
    [email],
  );
  if (existing.rowCount) {
    return jsonError("Email already registered. Please log in.", 409);
  }

  const recent = await query<CountRow>(
    `SELECT count(*)::text AS count
       FROM signup_codes
      WHERE lower(email) = lower($1)
        AND created_at > now() - interval '10 minutes'`,
    [email],
  );
  if (Number(recent.rows[0]?.count ?? "0") >= 3) {
    return jsonError("Too many codes requested. Try again later.", 429);
  }

  await query(
    "UPDATE signup_codes SET consumed_at = now() WHERE lower(email) = lower($1) AND consumed_at IS NULL",
    [email],
  );

  const code = generateSignupCode();
  const expiresAt = new Date(
    Date.now() + SIGNUP_CODE_TTL_MINUTES * 60 * 1000,
  );

  await query(
    "INSERT INTO signup_codes (email, code_hash, expires_at) VALUES ($1, $2, $3)",
    [email, hashSignupCode(email, code), expiresAt],
  );

  try {
    await sendSignupCodeEmail(email, code);
  } catch (error) {
    console.error("Failed to send signup code email", error);
    return jsonError(
      "Could not send the verification email. Try again shortly.",
      502,
    );
  }

  return NextResponse.json({
    ok: true,
    message: "A 6-digit verification code has been sent to your email.",
    expiresInMinutes: SIGNUP_CODE_TTL_MINUTES,
  });
}
