-- Avirvox Labs MVP — initial schema
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Users (purchasers)
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  password_hash text NOT NULL,
  email_verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX users_email_lower_uniq ON users (lower(email));

-- Email verification tokens
CREATE TABLE email_verification_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX email_verification_tokens_user_idx ON email_verification_tokens (user_id);

-- DB-backed sessions
CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX sessions_user_idx ON sessions (user_id);

-- Purchases
CREATE TABLE purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,

  asset text NOT NULL CHECK (asset IN ('BNB', 'USDT', 'USDC')),
  amount_paid numeric(38,18) NOT NULL CHECK (amount_paid > 0),
  avx_amount numeric(38,18) NOT NULL DEFAULT 0,
  price_usd numeric(10,6) NOT NULL DEFAULT 0.030,

  -- price provenance
  asset_usd_price numeric(38,18),
  usd_value numeric(38,18),
  price_source text,
  price_fetched_at timestamptz,
  block_timestamp timestamptz,

  -- wallets
  submitted_wallet text NOT NULL,
  chain_from_address text,

  -- chain data
  tx_hash char(66) NOT NULL,
  treasury_address text NOT NULL,
  token_contract text,
  chain_id integer NOT NULL DEFAULT 56,
  block_number bigint,
  block_hash text,
  confirmations integer NOT NULL DEFAULT 0,
  onchain_amount numeric(38,18),

  status text NOT NULL DEFAULT 'PENDING'
         CHECK (status IN ('PENDING', 'VERIFIED', 'FAILED')),
  verification_reason text,
  verified_at timestamptz,
  failed_at timestamptz,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  -- simple retry / sync bookkeeping (no outbox)
  sheet_synced_at timestamptz,
  sheet_sync_attempts integer NOT NULL DEFAULT 0,
  sheet_sync_error text,
  submission_email_sent_at timestamptz,
  verified_email_sent_at timestamptz,

  CONSTRAINT tx_hash_lowercase CHECK (tx_hash = lower(tx_hash))
);
CREATE UNIQUE INDEX purchases_tx_hash_uniq ON purchases (tx_hash);
CREATE INDEX purchases_user_idx ON purchases (user_id);
CREATE INDEX purchases_status_idx ON purchases (status);

-- Atomic allocation counter (single row)
CREATE TABLE sale_counters (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  allocation_avx numeric(38,18) NOT NULL DEFAULT 500000000,
  verified_avx_total numeric(38,18) NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO sale_counters (id) VALUES (1) ON CONFLICT DO NOTHING;
