import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/server/session";
import { jsonError } from "@/lib/server/api";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return jsonError("Unauthorized", 401);

  return NextResponse.json({
    ok: true,
    user: {
      email: user.email,
      emailVerified: user.emailVerified,
    },
  });
}
