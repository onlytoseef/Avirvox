#!/usr/bin/env node
/**
 * Integration tests for the purchase flow.
 * Requires a running app (npm run dev / start) and DATABASE_URL.
 *
 * Usage:
 *   APP_URL=http://localhost:3000 npm run test:integration
 */
import { createHash, randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(rootDir, ".env");
if (existsSync(envPath)) {
  const raw = await readFile(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(match[1] in process.env)) process.env[match[1]] = value;
  }
}

const BASE = process.env.APP_URL || "http://localhost:3000";
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

let passed = 0;
let failed = 0;

function check(name, condition, detail = "") {
  if (condition) {
    passed += 1;
    console.log(`PASS  ${name}`);
  } else {
    failed += 1;
    console.log(`FAIL  ${name}${detail ? ` :: ${detail}` : ""}`);
  }
}

async function call(method, pathName, body, cookie) {
  const headers = {};
  if (body !== undefined) headers["content-type"] = "application/json";
  if (cookie) headers.cookie = cookie;

  const response = await fetch(`${BASE}${pathName}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    // non-JSON response
  }
  const setCookies =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : response.headers.get("set-cookie")
        ? [response.headers.get("set-cookie")]
        : [];
  const cookieHeader = setCookies.map((c) => c.split(";")[0]).join("; ");

  return { status: response.status, json, text, cookie: cookieHeader };
}

const hex = (bytes) => `0x${randomBytes(bytes).toString("hex")}`;
const stamp = Date.now();
const emailA = `itest-a-${stamp}@example.com`;
const emailC = `itest-c-${stamp}@example.com`;
const password = "password123";

const client = new pg.Client({ connectionString: DATABASE_URL });
await client.connect();

try {
  const health = await call("GET", "/api/health/db");
  check("health endpoint", health.status === 200, `status ${health.status}`);

  const register = await call("POST", "/api/auth/register", {
    email: emailA,
    password,
  });
  check("register user", register.status === 201, `status ${register.status}`);

  const userResult = await client.query(
    "SELECT id FROM users WHERE lower(email) = lower($1)",
    [emailA],
  );
  const userId = userResult.rows[0]?.id;
  check("user persisted", Boolean(userId));

  const rawToken = `itest-token-${stamp}`;
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  await client.query(
    "INSERT INTO email_verification_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, now() + interval '1 hour')",
    [userId, tokenHash],
  );

  const verify = await call("POST", "/api/auth/verify-email", {
    token: rawToken,
  });
  check("verify email", verify.status === 200, `status ${verify.status}`);

  const login = await call("POST", "/api/auth/login", { email: emailA, password });
  check("login", login.status === 200, `status ${login.status}`);
  check("session cookie issued", login.cookie.includes("="));
  const cookie = login.cookie;

  const validPurchase = {
    asset: "BNB",
    amountPaid: "0.1",
    walletAddress: hex(20),
    txHash: hex(32),
    name: "Integration Buyer",
    email: emailA,
    country: "UAE",
  };

  const unauth = await call("POST", "/api/purchases", validPurchase);
  check("unauthenticated submission rejected", unauth.status === 401, `status ${unauth.status}`);

  const invalid = await call(
    "POST",
    "/api/purchases",
    {
      asset: "BNB",
      amountPaid: "abc",
      walletAddress: "0x123",
      txHash: "0x1",
      name: "",
      email: "bad",
      country: "",
    },
    cookie,
  );
  check("invalid input rejected", invalid.status === 422, `status ${invalid.status}`);

  const created = await call("POST", "/api/purchases", validPurchase, cookie);
  check("valid BNB purchase created", created.status === 201, `status ${created.status}`);
  check(
    "purchase starts PENDING",
    created.json?.purchase?.status === "PENDING",
    JSON.stringify(created.json),
  );

  const duplicate = await call("POST", "/api/purchases", validPurchase, cookie);
  check("duplicate tx hash rejected", duplicate.status === 409, `status ${duplicate.status}`);

  const list = await call("GET", "/api/purchases", undefined, cookie);
  check(
    "purchase list returns own records",
    list.status === 200 && Array.isArray(list.json?.purchases) && list.json.purchases.length >= 1,
    `status ${list.status}`,
  );

  const purchaseId = created.json?.purchase?.id;
  const verifyPurchase = await call(
    "POST",
    `/api/purchases/${purchaseId}/verify`,
    undefined,
    cookie,
  );
  check(
    "unknown tx stays pending",
    verifyPurchase.status === 200 && verifyPurchase.json?.status === "pending",
    JSON.stringify(verifyPurchase.json),
  );

  const usdtPurchase = {
    asset: "USDT",
    amountPaid: "10",
    walletAddress: hex(20),
    txHash: hex(32),
    name: "USDT Buyer",
    email: emailA,
    country: "UAE",
  };
  const usdt = await call("POST", "/api/purchases", usdtPurchase, cookie);
  check("valid USDT purchase created", usdt.status === 201, `status ${usdt.status}`);

  const emailC = `itest-c-${stamp}@example.com`;
  await call("POST", "/api/auth/register", { email: emailC, password });
  const loginC = await call("POST", "/api/auth/login", {
    email: emailC,
    password,
  });
  const unverifiedPurchase = await call(
    "POST",
    "/api/purchases",
    {
      asset: "USDC",
      amountPaid: "10",
      walletAddress: hex(20),
      txHash: hex(32),
      name: "Unverified",
      email: emailC,
      country: "UAE",
    },
    loginC.cookie,
  );
  check(
    "unverified user rejected",
    unverifiedPurchase.status === 403,
    `status ${unverifiedPurchase.status}`,
  );

  if (process.env.CRON_SECRET) {
    const cronResponse = await fetch(`${BASE}/api/cron/verify`, {
      method: "POST",
      headers: { "x-cron-secret": process.env.CRON_SECRET },
    });
    check("cron maintenance endpoint", cronResponse.status === 200, `status ${cronResponse.status}`);
  } else {
    console.log("SKIP  cron maintenance (CRON_SECRET not set)");
  }
} finally {
  await client.query(
    "DELETE FROM purchases WHERE user_id IN (SELECT id FROM users WHERE email LIKE $1)",
    [`itest-%@example.com`],
  );
  await client.query("DELETE FROM users WHERE email LIKE $1", [`itest-%@example.com`]);
  await client.end();
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
