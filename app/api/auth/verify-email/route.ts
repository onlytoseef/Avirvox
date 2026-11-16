import { NextResponse } from "next/server";
import type { QueryResultRow } from "pg";
import { getPool } from "@/lib/server/db";
import { hashToken } from "@/lib/server/auth";
import { verifyEmailSchema } from "@/lib/server/validation";
import { jsonError, readJson } from "@/lib/server/api";

type TokenRow = QueryResultRow & {
  id: string;
  user_id: string;
  expires_at: Date;
  used_at: Date | null;
};

async function consumeToken(rawToken: string): Promise<boolean> {
  const client = await getPool().connect();

  try {
    await client.query("BEGIN");

    const result = await client.query<TokenRow>(
      `SELECT id, user_id, expires_at, used_at
         FROM email_verification_tokens
        WHERE token_hash = $1
        FOR UPDATE`,
      [hashToken(rawToken)],
    );

    const token = result.rows[0];
    if (!token || token.used_at || token.expires_at.getTime() <= Date.now()) {
      await client.query("ROLLBACK");
      return false;
    }

    await client.query(
      `UPDATE users
          SET email_verified_at = COALESCE(email_verified_at, now()),
              updated_at = now()
        WHERE id = $1`,
      [token.user_id],
    );
    await client.query(
      "UPDATE email_verification_tokens SET used_at = now() WHERE id = $1",
      [token.id],
    );

    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return jsonError("Missing verification token", 400);

  const verified = await consumeToken(token);
  if (!verified) return jsonError("Invalid or expired verification link", 400);

  return NextResponse.json({ ok: true, verified: true });
}

export async function POST(request: Request) {
  const parsed = verifyEmailSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError("Missing verification token", 400);

  const verified = await consumeToken(parsed.data.token);
  if (!verified) return jsonError("Invalid or expired verification link", 400);

  return NextResponse.json({ ok: true, verified: true });
}
