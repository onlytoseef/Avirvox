import { NextResponse } from "next/server";
import { query } from "@/lib/server/db";
import { generateToken, hashToken } from "@/lib/server/auth";
import { getSessionUser } from "@/lib/server/session";
import { sendVerificationEmail } from "@/lib/server/email";
import { jsonError, sameOrigin } from "@/lib/server/api";
import { rateLimit } from "@/lib/server/rate-limit";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);

  const user = await getSessionUser();
  if (!user) return jsonError("Unauthorized", 401);

  if (user.emailVerified) {
    return NextResponse.json({ ok: true, message: "Email already verified." });
  }

  const limit = rateLimit(`resend:${user.id}`, 3, 10 * 60_000);
  if (!limit.ok) {
    return jsonError("Too many attempts. Try again later.", 429);
  }

  const token = generateToken(32);
  const ttlHours = Number(process.env.EMAIL_TOKEN_TTL_HOURS || "24");
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

  await query(
    "INSERT INTO email_verification_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
    [user.id, hashToken(token), expiresAt],
  );

  const origin = process.env.APP_URL || new URL(request.url).origin;
  const verifyUrl = `${origin}/verify-email?token=${encodeURIComponent(token)}`;

  try {
    await sendVerificationEmail(user.email, verifyUrl);
  } catch (error) {
    console.error("Failed to send verification email", error);
  }

  return NextResponse.json({ ok: true, message: "Verification email sent." });
}
