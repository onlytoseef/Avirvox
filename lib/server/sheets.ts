import { google } from "googleapis";
import type { QueryResultRow } from "pg";
import { query } from "./db";

const HEADERS = [
  "Purchase ID",
  "Submitted At",
  "Name",
  "Email",
  "Country",
  "Asset",
  "Amount Paid",
  "USD Value",
  "Price Source",
  "Estimated AVX",
  "Status",
  "Tx Hash",
  "Wallet",
  "Treasury",
  "Block",
  "Confirmations",
  "Verified At",
] as const;

type SheetPurchaseRow = QueryResultRow & {
  id: string;
  submitted_at: Date;
  purchaser_name: string | null;
  purchaser_email: string | null;
  purchaser_country: string | null;
  asset: string;
  amount_paid: string;
  usd_value: string | null;
  price_source: string | null;
  avx_amount: string;
  status: string;
  tx_hash: string;
  submitted_wallet: string;
  treasury_address: string;
  block_number: string | null;
  confirmations: number;
  verified_at: Date | null;
};

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !key || !spreadsheetId) return null;

  const auth = new google.auth.JWT({
    email,
    key: key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    sheets: google.sheets({ version: "v4", auth }),
    spreadsheetId,
  };
}

function toDateString(value: Date | null): string {
  return value ? value.toISOString() : "";
}

/**
 * Syncs one purchase to Google Sheets.
 * Uses Purchase ID to update an existing row (never duplicates rows).
 * Failures are recorded for retry and never change verification status.
 */
export async function syncPurchaseToSheet(purchaseId: string): Promise<boolean> {
  const config = getSheetsClient();
  if (!config) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[sheets] not configured; skipping sync");
    }
    return false;
  }

  const tab = process.env.GOOGLE_SHEET_TAB || "Purchases";

  try {
    const result = await query<SheetPurchaseRow>(
      `SELECT id, submitted_at, purchaser_name, purchaser_email, purchaser_country,
              asset, amount_paid::text AS amount_paid, usd_value::text AS usd_value,
              price_source, avx_amount::text AS avx_amount, status, tx_hash,
              submitted_wallet, treasury_address, block_number::text AS block_number,
              confirmations, verified_at
         FROM purchases WHERE id = $1`,
      [purchaseId],
    );
    const purchase = result.rows[0];
    if (!purchase) return false;

    const rowValues = [
      purchase.id,
      toDateString(purchase.submitted_at),
      purchase.purchaser_name ?? "",
      purchase.purchaser_email ?? "",
      purchase.purchaser_country ?? "",
      purchase.asset,
      purchase.amount_paid,
      purchase.usd_value ?? "",
      purchase.price_source ?? "",
      purchase.avx_amount,
      purchase.status,
      purchase.tx_hash,
      purchase.submitted_wallet,
      purchase.treasury_address,
      purchase.block_number ?? "",
      String(purchase.confirmations),
      toDateString(purchase.verified_at),
    ];

    const header = await config.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: `${tab}!A1:Q1`,
    });
    if (!header.data.values || header.data.values.length === 0) {
      await config.sheets.spreadsheets.values.update({
        spreadsheetId: config.spreadsheetId,
        range: `${tab}!A1:Q1`,
        valueInputOption: "RAW",
        requestBody: { values: [HEADERS as unknown as string[]] },
      });
    }

    const idColumn = await config.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: `${tab}!A2:A`,
    });
    const existing = idColumn.data.values ?? [];
    const index = existing.findIndex((row) => row[0] === purchase.id);

    if (index >= 0) {
      const rowNumber = index + 2;
      await config.sheets.spreadsheets.values.update({
        spreadsheetId: config.spreadsheetId,
        range: `${tab}!A${rowNumber}:Q${rowNumber}`,
        valueInputOption: "RAW",
        requestBody: { values: [rowValues] },
      });
    } else {
      await config.sheets.spreadsheets.values.append({
        spreadsheetId: config.spreadsheetId,
        range: `${tab}!A1`,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [rowValues] },
      });
    }

    await query(
      `UPDATE purchases
          SET sheet_synced_at = now(), sheet_sync_error = NULL, updated_at = now()
        WHERE id = $1`,
      [purchaseId],
    );
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown sheets error";
    await query(
      `UPDATE purchases
          SET sheet_sync_attempts = sheet_sync_attempts + 1,
              sheet_sync_error = $2,
              updated_at = now()
        WHERE id = $1`,
      [purchaseId, message.slice(0, 500)],
    ).catch(() => undefined);
    if (process.env.NODE_ENV !== "production") {
      console.error("[sheets] sync failed:", message);
    }
    return false;
  }
}
