import { NextResponse } from "next/server";
import {
  clearSessionCookie,
  destroyCurrentSession,
} from "@/lib/server/session";
import { isSecureRequest, jsonError, sameOrigin } from "@/lib/server/api";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid origin", 403);

  await destroyCurrentSession();

  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response, isSecureRequest(request));
  return response;
}
