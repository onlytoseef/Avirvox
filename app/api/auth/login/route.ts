import { NextResponse } from "next/server";
import type { QueryResultRow } from "pg";
import { query } from "@/lib/server/db";
import { verifyPassword } from "@/lib/server/auth";
import { loginSchema } from "@/lib/server/validation";
import { createSession, setSessionCookie } from "@/lib/server/session";
import {
  clientIp,
  isSecureRequest,
  jsonError,
  readJson,
  sameOrigin,
} from "@/lib/server/api";
import { rateLimit } from "@/lib/server/rate-limit";

type LoginRow = QueryResultRow & {
  id: string;
  password_hash: string;
  email_verified_at: Date | null;
};

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);

  const limit = rateLimit(`login:${clientIp(request)}`, 10, 10 * 60_000);
  if (!limit.ok) {
    return jsonError("Too many attempts. Try again later.", 429);
  }

  const parsed = loginSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError("Invalid email or password", 401);

  const { email, password } = parsed.data;

  const result = await query<LoginRow>(
    "SELECT id, password_hash, email_verified_at FROM users WHERE lower(email) = $1",
    [email],
  );
  const user = result.rows[0];
  if (!user) return jsonError("Invalid email or password", 401);

  const valid = await verifyPassword(user.password_hash, password);
  if (!valid) return jsonError("Invalid email or password", 401);

  const { token, expiresAt } = await createSession(user.id);

  const response = NextResponse.json({
    ok: true,
    emailVerified: user.email_verified_at !== null,
  });
  setSessionCookie(response, token, expiresAt, isSecureRequest(request));
  return response;
}
