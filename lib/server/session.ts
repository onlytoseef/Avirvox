import type { QueryResultRow } from "pg";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { query } from "./db";
import { generateToken, hashToken } from "./auth";

export const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME || "avx_session";
const SESSION_TTL_DAYS = Number(process.env.SESSION_TTL_DAYS || "14");

export type SessionUser = {
  id: string;
  email: string;
  emailVerified: boolean;
};

type SessionUserRow = QueryResultRow & {
  id: string;
  email: string;
  email_verified_at: Date | null;
};

export async function createSession(
  userId: string,
): Promise<{ token: string; expiresAt: Date }> {
  const token = generateToken(32);
  const expiresAt = new Date(
    Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000,
  );

  await query(
    "INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
    [userId, hashToken(token), expiresAt],
  );

  return { token, expiresAt };
}

export function setSessionCookie(
  response: NextResponse,
  token: string,
  expiresAt: Date,
  secure: boolean,
): void {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export function clearSessionCookie(
  response: NextResponse,
  secure: boolean,
): void {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

async function getSessionToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const token = await getSessionToken();
  if (!token) return null;

  const result = await query<SessionUserRow>(
    `SELECT u.id, u.email, u.email_verified_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [hashToken(token)],
  );

  const row = result.rows[0];
  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    emailVerified: row.email_verified_at !== null,
  };
}

export async function destroyCurrentSession(): Promise<void> {
  const token = await getSessionToken();
  if (!token) return;

  await query("DELETE FROM sessions WHERE token_hash = $1", [hashToken(token)]);
}
