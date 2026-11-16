import type { QueryResultRow } from "pg";
import { query } from "./db";
import { sendMail } from "./email";

type NotificationRow = QueryResultRow & {
  id: string;
  status: string;
  purchaser_name: string | null;
  purchaser_email: string | null;
  asset: string;
  amount_paid: string;
  avx_amount: string;
  tx_hash: string;
};

const MAX_EMAIL_ATTEMPTS = 6;

function escapeHtml(value: string | null): string {
  return (value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function claim(
  purchaseId: string,
  sentColumn: string,
  attemptsColumn: string,
  requiredStatusSql: string,
): Promise<NotificationRow | null> {
  const result = await query<NotificationRow>(
    `UPDATE purchases
        SET ${sentColumn} = now(),
            ${attemptsColumn} = ${attemptsColumn} + 1
      WHERE id = $1
        AND ${sentColumn} IS NULL
        AND ${attemptsColumn} < ${MAX_EMAIL_ATTEMPTS}
        AND ${requiredStatusSql}
      RETURNING id, status, purchaser_name, purchaser_email, asset,
                amount_paid::text AS amount_paid, avx_amount::text AS avx_amount, tx_hash`,
    [purchaseId],
  );
  return result.rows[0] ?? null;
}

async function release(purchaseId: string, sentColumn: string, error: unknown) {
  const message =
    error instanceof Error && error.message
      ? error.message
      : error instanceof Error
        ? `${error.name}: email delivery failed`
        : "unknown email error";
  console.error(`[email] delivery failed for purchase ${purchaseId}: ${message}`);
  await query(
    `UPDATE purchases SET ${sentColumn} = NULL, last_email_error = $2 WHERE id = $1`,
    [purchaseId, message.slice(0, 500)],
  );
}

export async function notifySubmission(purchaseId: string): Promise<boolean> {
  const row = await claim(
    purchaseId,
    "submission_email_sent_at",
    "submission_email_attempts",
    "true",
  );
  if (!row || !row.purchaser_email) return false;

  try {
    await sendMail({
      to: row.purchaser_email,
      subject: "Avirvox Labs — purchase submitted (verification pending)",
      text: `Hello ${row.purchaser_name ?? "there"},\n\nWe received your AVX purchase submission.\n\nPurchase ID: ${row.id}\nAsset: ${row.asset}\nAmount: ${row.amount_paid}\nEstimated AVX: ${row.avx_amount}\nTransaction: ${row.tx_hash}\n\nYour payment is PENDING blockchain verification. AVX is not allocated until the transfer is confirmed on BNB Smart Chain.\n\nAvirvox Labs`,
      html: `<p>Hello ${escapeHtml(row.purchaser_name) || "there"},</p><p>We received your AVX purchase submission.</p><ul><li>Purchase ID: ${escapeHtml(row.id)}</li><li>Asset: ${escapeHtml(row.asset)}</li><li>Amount: ${escapeHtml(row.amount_paid)}</li><li>Estimated AVX: ${escapeHtml(row.avx_amount)}</li><li>Transaction: ${escapeHtml(row.tx_hash)}</li></ul><p>Your payment is <strong>PENDING blockchain verification</strong>. AVX is not allocated until the transfer is confirmed on BNB Smart Chain.</p><p>Avirvox Labs</p>`,
    });
    return true;
  } catch (error) {
    await release(purchaseId, "submission_email_sent_at", error);
    return false;
  }
}

export async function notifyVerified(purchaseId: string): Promise<boolean> {
  const row = await claim(
    purchaseId,
    "verified_email_sent_at",
    "verified_email_attempts",
    "status = 'VERIFIED'",
  );
  if (!row || !row.purchaser_email) return false;

  try {
    await sendMail({
      to: row.purchaser_email,
      subject: "Avirvox Labs — payment verified",
      text: `Hello ${row.purchaser_name ?? "there"},\n\nYour payment has been verified on BNB Smart Chain and AVX has been allocated.\n\nPurchase ID: ${row.id}\nAsset: ${row.asset}\nAmount: ${row.amount_paid}\nAllocated AVX: ${row.avx_amount}\nTransaction: ${row.tx_hash}\n\nAvirvox Labs`,
      html: `<p>Hello ${escapeHtml(row.purchaser_name) || "there"},</p><p>Your payment has been <strong>verified</strong> on BNB Smart Chain and AVX has been allocated.</p><ul><li>Purchase ID: ${escapeHtml(row.id)}</li><li>Asset: ${escapeHtml(row.asset)}</li><li>Amount: ${escapeHtml(row.amount_paid)}</li><li>Allocated AVX: ${escapeHtml(row.avx_amount)}</li><li>Transaction: ${escapeHtml(row.tx_hash)}</li></ul><p>Avirvox Labs</p>`,
    });
    return true;
  } catch (error) {
    await release(purchaseId, "verified_email_sent_at", error);
    return false;
  }
}

export async function notifyFailed(purchaseId: string): Promise<boolean> {
  const row = await claim(
    purchaseId,
    "failure_email_sent_at",
    "failure_email_attempts",
    "status = 'FAILED'",
  );
  if (!row || !row.purchaser_email) return false;

  try {
    await sendMail({
      to: row.purchaser_email,
      subject: "Avirvox Labs — payment could not be verified",
      text: `Hello ${row.purchaser_name ?? "there"},\n\nWe could not verify your submitted payment against the official treasury on BNB Smart Chain. This does not necessarily mean funds were not received; our team will review it.\n\nPurchase ID: ${row.id}\nAsset: ${row.asset}\nAmount: ${row.amount_paid}\nTransaction: ${row.tx_hash}\n\nPlease contact support with your purchase ID.\n\nAvirvox Labs`,
      html: `<p>Hello ${escapeHtml(row.purchaser_name) || "there"},</p><p>We could not verify your submitted payment against the official treasury on BNB Smart Chain. This does not necessarily mean funds were not received; our team will review it.</p><ul><li>Purchase ID: ${escapeHtml(row.id)}</li><li>Asset: ${escapeHtml(row.asset)}</li><li>Amount: ${escapeHtml(row.amount_paid)}</li><li>Transaction: ${escapeHtml(row.tx_hash)}</li></ul><p>Please contact support with your purchase ID.</p><p>Avirvox Labs</p>`,
    });
    return true;
  } catch (error) {
    await release(purchaseId, "failure_email_sent_at", error);
    return false;
  }
}

/** Retries unsent notifications with a simple attempt cap. */
export async function retryNotifications(limit = 5): Promise<void> {
  const submission = await query<{ id: string }>(
    `SELECT id FROM purchases
      WHERE submission_email_sent_at IS NULL AND submission_email_attempts < ${MAX_EMAIL_ATTEMPTS}
      ORDER BY submitted_at ASC LIMIT $1`,
    [limit],
  );
  for (const row of submission.rows) await notifySubmission(row.id);

  const verified = await query<{ id: string }>(
    `SELECT id FROM purchases
      WHERE status = 'VERIFIED' AND verified_email_sent_at IS NULL AND verified_email_attempts < ${MAX_EMAIL_ATTEMPTS}
      ORDER BY verified_at ASC LIMIT $1`,
    [limit],
  );
  for (const row of verified.rows) await notifyVerified(row.id);

  const failed = await query<{ id: string }>(
    `SELECT id FROM purchases
      WHERE status = 'FAILED' AND failure_email_sent_at IS NULL AND failure_email_attempts < ${MAX_EMAIL_ATTEMPTS}
      ORDER BY failed_at ASC LIMIT $1`,
    [limit],
  );
  for (const row of failed.rows) await notifyFailed(row.id);
}
