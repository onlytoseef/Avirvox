import { connection, NextResponse } from "next/server";
import { getPool } from "@/lib/server/db";

/** Database health check. */
export async function GET() {
  await connection();

  try {
    const pool = getPool();
    const result = await pool.query("SELECT 1 AS ok");

    return NextResponse.json({
      ok: true,
      db: "connected",
      result: result.rows[0]?.ok ?? 1,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database health check failed:", error);
    return NextResponse.json(
      { ok: false, db: "unavailable" },
      { status: 503 },
    );
  }
}
