import { NextResponse } from "next/server";
import type { QueryResultRow } from "pg";
import { query } from "@/lib/server/db";
import { generateToken, hashPassword, hashToken } from "@/lib/server/auth";
import { registerSchema } from "@/lib/server/validation";
import { clientIp, jsonError, readJson, sameOrigin } from "@/lib/server/api";
import { rateLimit } from "@/lib/server/rate-limit";
import { sendVerificationEmail } from "@/lib/server/email";

type UserIdRow = QueryResultRow & { id: string };

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);

  const limit = rateLimit(`register:${clientIp(request)}`, 5, 10 * 60_000);
  if (!limit.ok) {
    return jsonError("Too many attempts. Try again later.", 429);
  }

  const parsed = registerSchema.safeParse(await readJson(request));
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 422);
  }

  const { email, password } = parsed.data;

  const existing = await query("SELECT id FROM users WHERE lower(email) = $1", [
    email,
  ]);
  if (existing.rowCount) return jsonError("Email already registered", 409);

  const passwordHash = await hashPassword(password);

  let userId: string;
  try {
    const inserted = await query<UserIdRow>(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
      [email, passwordHash],
    );
    userId = inserted.rows[0].id;
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return jsonError("Email already registered", 409);
    }
    throw error;
  }

  const token = generateToken(32);
  const ttlHours = Number(process.env.EMAIL_TOKEN_TTL_HOURS || "24");
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

  await query(
    "INSERT INTO email_verification_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
    [userId, hashToken(token), expiresAt],
  );

  const origin = process.env.APP_URL || new URL(request.url).origin;
  const verifyUrl = `${origin}/verify-email?token=${encodeURIComponent(token)}`;

  try {
    await sendVerificationEmail(email, verifyUrl);
  } catch (error) {
    console.error("Failed to send verification email", error);
  }

  return NextResponse.json(
    { ok: true, message: "Registered. Check your email to verify your account." },
    { status: 201 },
  );
}
