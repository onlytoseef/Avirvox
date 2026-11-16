-- Phase 4-6: purchaser details + simple retry bookkeeping
ALTER TABLE purchases
  ADD COLUMN purchaser_name text,
  ADD COLUMN purchaser_email text,
  ADD COLUMN purchaser_country text,
  ADD COLUMN failure_email_sent_at timestamptz,
  ADD COLUMN verify_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN last_verify_at timestamptz,
  ADD COLUMN next_verify_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN submission_email_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN verified_email_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN failure_email_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN last_email_error text;

CREATE INDEX purchases_next_verify_idx ON purchases (status, next_verify_at);
CREATE INDEX purchases_sheet_pending_idx ON purchases (sheet_synced_at);
