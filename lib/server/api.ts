import { NextResponse } from "next/server";

export function jsonError(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

function hostCandidates(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

function stripDefaultPort(host: string): string {
  return host.replace(/:443$/, "").replace(/:80$/, "");
}

/**
 * Basic CSRF guard: reject cross-origin browser requests.
 * Proxy-aware: compares the Origin host against forwarded host, Host header,
 * the request URL host, and APP_URL so it works behind Dokploy/Traefik.
 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  let originHost: string;
  try {
    originHost = stripDefaultPort(new URL(origin).host.toLowerCase());
  } catch {
    return false;
  }

  const candidates = [
    ...hostCandidates(request.headers.get("x-forwarded-host")),
    ...hostCandidates(request.headers.get("host")),
  ];

  try {
    candidates.push(new URL(request.url).host.toLowerCase());
  } catch {
    // ignore malformed request URL
  }

  if (process.env.APP_URL) {
    try {
      candidates.push(new URL(process.env.APP_URL).host.toLowerCase());
    } catch {
      // ignore malformed APP_URL
    }
  }

  return candidates.map(stripDefaultPort).includes(originHost);
}

/** True when the request arrived over HTTPS (direct or via proxy). */
export function isSecureRequest(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-proto");
  if (forwarded) return forwarded.split(",")[0]?.trim() === "https";
  return new URL(request.url).protocol === "https:";
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
