# Avirvox Labs — Backend Deployment

Stack: Next.js 16 (App Router, Node runtime) · PostgreSQL via `pg` · raw SQL migrations · viem (read-only BSC) · CoinGecko · Google Sheets API · Nodemailer SMTP.

## 1. PostgreSQL
1. Provision a PostgreSQL database (Dokploy managed service or external).
2. Set `DATABASE_URL`.
3. Apply migrations (idempotent):
   ```bash
   npm run db:migrate
   ```
Migrations live in `db/migrations/` and are tracked in `schema_migrations`.

## 2. Environment
Copy `.env.example` to `.env` and fill every value. Never commit real credentials.

## 3. BNB Smart Chain (read-only)
- `BSC_RPC_URL`: use a reliable provider (public dataseed works for low volume; a paid provider is recommended).
- `TREASURY_WALLET_ADDRESS`: official receiving wallet.
- `USDT_CONTRACT_ADDRESS` / `USDC_CONTRACT_ADDRESS`: BSC (Binance-Peg) token contracts. **Verify** against official sources and on-chain `symbol()`/`decimals()` before production.
- `USDT_DECIMALS` / `USDC_DECIMALS`: 18 on BSC (Binance-Peg). Confirm on-chain.
- `REQUIRED_CONFIRMATIONS`: default 12.
- Verification is read-only: no private keys, signing, wallet connection, or contract interaction. The AVX token contract is display-only and is never a payment recipient.

## 4. SMTP
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.
- `MAIL_FROM=coin@avirvox.io`, `MAIL_CC=avirvoxlabs@gmail.com`.
- Configure SPF/DKIM/DMARC for deliverability.
- When SMTP is unset in development, verification links are logged to the server console (never in production).

## 5. Google Sheets
1. Create a Google Cloud service account and enable the Google Sheets API.
2. Create a JSON key; set `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` (keep `\n` escapes in the key).
3. Create/choose the sheet owned by `avirvoxlabs@gmail.com` and share it with the service account as **Editor**.
4. Set `GOOGLE_SHEET_ID` (the long id in the sheet URL) and `GOOGLE_SHEET_TAB` (default `Purchases`).
- One row per purchase; rows are matched by Purchase ID and updated in place.
- Sheets failures are recorded on the purchase and retried; they never change blockchain verification status.

## 6. Cron / maintenance
- Endpoint: `POST /api/cron/verify` with header `x-cron-secret: $CRON_SECRET`.
- Schedule it (e.g. every 5 minutes) in Dokploy. It:
  - re-verifies PENDING purchases awaiting confirmations,
  - retries failed Google Sheets syncs,
  - retries unsent emails.

## 7. Dokploy
1. Create a PostgreSQL service; copy its connection string into `DATABASE_URL`.
2. Configure all environment variables.
3. Build/run the Next.js app (Node runtime). `next.config.ts` uses `output: "standalone"` for container builds.
4. On release/start, run `npm run db:migrate`.
5. Enable HTTPS (cookies are `Secure` automatically when the request is HTTPS).
6. Add the scheduled maintenance task from §6.
7. Back up the database (scheduled `pg_dump`).

## 8. Verification checklist
- `npm run build` succeeds.
- `npm run db:migrate` is idempotent on a clean database.
- `GET /api/health/db` → `200 { ok: true }`.
- `GET /api/config/sale` returns live prices.
- Register → verify email → log in.
- Submit a purchase → status PENDING → run `/api/cron/verify` after confirmations → VERIFIED + allocation + sheet row + email.
