/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import Decimal from "decimal.js";
import { FiCheck, FiCopy } from "react-icons/fi";

type Asset = "BNB" | "USDT" | "USDC";

type SaleInfo = {
  priceUsd: string;
  remainingAvx: string;
  treasuryAddress: string;
  currency: Asset[];
  closesAt: string;
};

type Prices = { BNB: string; USDT: string; USDC: string };

const ASSETS: Asset[] = ["BNB", "USDT", "USDC"];

const fieldClass =
  "w-full rounded-xl border border-[#4b4654] bg-[#15121a] px-4 py-3 text-sm text-white placeholder:text-[#7f7888] focus:border-[#e2469b] focus:outline-none";

export function PurchasePanel() {
  const [sale, setSale] = useState<SaleInfo | null>(null);
  const [prices, setPrices] = useState<Prices | null>(null);
  const [asset, setAsset] = useState<Asset>("BNB");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [wallet, setWallet] = useState("");
  const [txHash, setTxHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/config/sale")
      .then((res) => res.json())
      .then((data) => {
        if (data?.ok) {
          setSale(data.sale);
          setPrices(data.prices);
        }
      })
      .catch(() => undefined);
  }, []);

  const estimate = useMemo(() => {
    if (!prices || !sale || !amount) return "0";
    const price = prices[asset];
    if (!price) return "0";
    try {
      return new Decimal(amount)
        .mul(price)
        .div(sale.priceUsd)
        .toDecimalPlaces(18, Decimal.ROUND_DOWN)
        .toFixed(4);
    } catch {
      return "0";
    }
  }, [amount, asset, prices, sale]);

  async function copyAddress() {
    if (!sale) return;
    try {
      await navigator.clipboard.writeText(sale.treasuryAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/purchases", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          asset,
          amountPaid: amount,
          walletAddress: wallet,
          txHash,
          name,
          email,
          country,
        }),
      });
      const data = await response.json().catch(() => null);

      if (response.status === 401) {
        setError("Please log in to submit a purchase.");
        return;
      }
      if (response.status === 403) {
        setError(data?.error ?? "Email verification is required before submitting.");
        return;
      }
      if (!response.ok) {
        setError(data?.error ?? "Submission failed. Please check your details.");
        return;
      }

      setMessage(
        `Purchase submitted (ID ${data.purchase.id}). Status: PENDING blockchain verification.`,
      );
      setAmount("");
      setTxHash("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full min-w-0 max-w-[615px]" style={{ containerType: "inline-size" }}>
      <div className="bg-gradient-to-b from-[#f08a24] via-[#5a2a6e] to-[#a63de8] p-px shadow-[0_25px_100px_#0008] rounded-[32px]">
        <div className="rounded-[31px] bg-[#05030a] p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-lg bg-[#1f1d26] px-3 py-1.5 text-xs font-medium uppercase">
              Public Presale
            </span>
            <span className="rounded-lg bg-[#26232d] px-3 py-1.5 text-xs font-medium uppercase text-[#ff9a1f]">
              $0.030 / AVX
            </span>
          </div>

          <p className="mt-4 text-xs text-[#cdc8d4]">
            Closes 28 February 2027 · BNB Smart Chain
          </p>

          {sale && (
            <p className="mt-1 text-xs text-[#9a95a3]">
              Remaining allocation:{" "}
              {new Decimal(sale.remainingAvx).toDecimalPlaces(0).toFixed(0)} AVX
            </p>
          )}

          <div className="mt-5">
            <p className="text-sm text-[#e0dce4]">Pay With</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {ASSETS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAsset(option)}
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                    asset === option
                      ? "border-[#e2469b] bg-[#2a1633] text-white"
                      : "border-[#4b4654] text-[#cdc8d4] hover:border-[#e2469b]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {prices && (
              <p className="mt-2 text-[11px] text-[#9a95a3]">
                1 {asset} ≈ ${new Decimal(prices[asset]).toFixed(4)} (live)
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-sm text-[#e0dce4]" htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder={`Amount in ${asset}`}
              className={`${fieldClass} mt-2`}
            />
          </div>

          <div className="mt-3 flex items-center justify-between rounded-[14px] bg-[#1e1b3f] px-4 py-3 text-sm">
            <span className="text-[#d4cfe6]">Estimated AVX</span>
            <span className="font-medium">{estimate} AVX</span>
          </div>

          {sale && (
            <div className="mt-4 rounded-xl border border-[#4b4654] p-3">
              <p className="text-xs uppercase text-[#cdc8d4]">Official Treasury (BSC)</p>
              <div className="mt-2 flex items-center gap-2">
                <code className="min-w-0 flex-1 break-all text-[11px] text-[#e0dce4]">
                  {sale.treasuryAddress}
                </code>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="shrink-0 rounded-full border border-[#4b4654] p-2 text-[#e858b3] hover:border-[#e858b3]"
                  aria-label="Copy treasury address"
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                </button>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src="/api/treasury/qr"
                  alt="Treasury wallet QR code"
                  width={88}
                  height={88}
                  className="rounded-lg bg-white p-1"
                />
                <p className="text-[11px] leading-snug text-[#9a95a3]">
                  Send {asset} on BNB Smart Chain to this address, then paste the
                  transaction hash below.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
            <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required />
            <input className={fieldClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input className={fieldClass} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required />
            <input className={fieldClass} value={wallet} onChange={(e) => setWallet(e.target.value)} placeholder="Your sending wallet (0x...)" required />
            <input className={fieldClass} value={txHash} onChange={(e) => setTxHash(e.target.value)} placeholder="Transaction hash (0x...)" required />

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex min-h-[52px] w-full items-center justify-center rounded-full bg-gradient-to-b from-[#f8861f] via-[#e44a8c] to-[#a63de8] text-sm font-medium text-white shadow-[inset_0_1px_#ffffff40] disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Purchase"}
            </button>
          </form>

          {message && (
            <p className="mt-3 rounded-lg bg-[#132a1c] px-3 py-2 text-xs text-[#9be7b4]">
              {message}{" "}
              <Link href="/dashboard" className="underline">
                View dashboard
              </Link>
            </p>
          )}
          {error && (
            <p className="mt-3 rounded-lg bg-[#2a1218] px-3 py-2 text-xs text-[#f2a3b5]">
              {error}{" "}
              {error.toLowerCase().includes("log in") && (
                <Link href="/login" className="underline">
                  Log in
                </Link>
              )}
            </p>
          )}

          <p className="mt-4 text-[11px] leading-snug text-[#9a95a3]">
            Manual payment only. No wallet connection or smart-contract purchase.
            Purchases remain PENDING until independently verified on-chain.
          </p>
        </div>
      </div>
    </div>
  );
}
