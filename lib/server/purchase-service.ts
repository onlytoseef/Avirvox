import type { QueryResultRow } from "pg";
import { query } from "./db";
import { syncPurchaseToSheet } from "./sheets";
import { notifyFailed, notifySubmission, notifyVerified } from "./notifications";

type StatusRow = QueryResultRow & { status: string };

export async function afterPurchaseSubmitted(purchaseId: string): Promise<void> {
  await syncPurchaseToSheet(purchaseId).catch((error) =>
    console.error("Sheet sync after submission failed", error),
  );
  await notifySubmission(purchaseId).catch((error) =>
    console.error("Submission email failed", error),
  );
}

export async function afterPurchaseFinalized(purchaseId: string): Promise<void> {
  await syncPurchaseToSheet(purchaseId).catch((error) =>
    console.error("Sheet sync after verification failed", error),
  );

  const result = await query<StatusRow>(
    "SELECT status FROM purchases WHERE id = $1",
    [purchaseId],
  );
  const status = result.rows[0]?.status;

  if (status === "VERIFIED") {
    await notifyVerified(purchaseId).catch((error) =>
      console.error("Verified email failed", error),
    );
  } else if (status === "FAILED") {
    await notifyFailed(purchaseId).catch((error) =>
      console.error("Failure email failed", error),
    );
  }
}
