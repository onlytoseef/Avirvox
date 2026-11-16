/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Purchase = {
  id: string;
  asset: string;
  amount_paid: string;
  avx_amount: string;
  status: string;
  tx_hash: string;
  submitted_wallet: string;
  purchaser_name: string | null;
  purchaser_email: string | null;
  purchaser_country: string | null;
  submitted_at: string;
  verified_at: string | null;
  verification_reason: string | null;
  confirmations: number;
  usd_value: string | null;
  price_source: string | null;
};

const statusStyles: Record<string, string> = {
  PENDING: "border-[#8a6a1f] bg-[#2a2210] text-[#f0c970]",
  VERIFIED: "border-[#2c6a44] bg-[#0f2a1c] text-[#8ee0ab]",
  FAILED: "border-[#6a2c3a] bg-[#2a1018] text-[#f2a3b5]",
};

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState<string | null>(null);

  const load = useCallback(async () => {
    const meResponse = await fetch("/api/auth/me");
    if (meResponse.status === 401) {
      router.push("/login");
      return;
    }
    const me = await meResponse.json().catch(() => null);
    setEmail(me?.user?.email ?? null);

    const response = await fetch("/api/purchases");
    if (response.status === 401) {
      router.push("/login");
      return;
    }
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setError(data?.error ?? "Unable to load purchases.");
      return;
    }
    setPurchases(data.purchases ?? []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load().catch(() => {
      setError("Unable to load dashboard.");
      setLoading(false);
    });
  }, [load]);

  async function verify(id: string) {
    setVerifying(id);
    try {
      await fetch(`/api/purchases/${id}/verify`, { method: "POST" });
      await load();
    } finally {
      setVerifying(null);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1200px] px-5 py-28 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e858b3]">
            Avirvox Labs
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[#f6eaf4]">
            Purchaser Dashboard
          </h1>
          {email && <p className="mt-1 text-sm text-[#9a95a3]">{email}</p>}
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="rounded-full border border-[#50405f] px-5 py-2 text-sm text-white"
          >
            Home
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-[#50405f] px-5 py-2 text-sm text-white"
          >
            Log out
          </button>
        </div>
      </div>

      {loading && <p className="mt-10 text-sm text-[#c9bccf]">Loading...</p>}
      {error && <p className="mt-10 text-sm text-[#f2a3b5]">{error}</p>}

      {!loading && !error && purchases.length === 0 && (
        <div className="mt-10 rounded-[24px] border border-[#4d3d57] bg-[#0b0612] p-8 text-sm text-[#c9bccf]">
          No purchases yet. Submit one from the{" "}
          <Link href="/#home" className="text-[#e858b3] underline">
            participation panel
          </Link>
          .
        </div>
      )}

      <div className="mt-8 grid gap-4">
        {purchases.map((purchase) => (
          <article
            key={purchase.id}
            className="rounded-[24px] border border-[#4d3d57] bg-[#0b0612] p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-[#9a95a3]">Purchase ID</p>
                <p className="break-all text-sm text-white">{purchase.id}</p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  statusStyles[purchase.status] ??
                  "border-[#4b4654] text-[#c9bccf]"
                }`}
              >
                {purchase.status}
              </span>
            </div>

            <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-xs text-[#9a95a3]">Purchaser</dt>
                <dd className="text-white">
                  {purchase.purchaser_name ?? "—"}
                  {purchase.purchaser_country ? ` · ${purchase.purchaser_country}` : ""}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#9a95a3]">Email</dt>
                <dd className="break-all text-white">{purchase.purchaser_email ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#9a95a3]">Submitted</dt>
                <dd className="text-white">
                  {new Date(purchase.submitted_at).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#9a95a3]">Payment</dt>
                <dd className="text-white">
                  {purchase.amount_paid} {purchase.asset}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#9a95a3]">AVX</dt>
                <dd className="text-white">{purchase.avx_amount}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#9a95a3]">Confirmations</dt>
                <dd className="text-white">{purchase.confirmations}</dd>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <dt className="text-xs text-[#9a95a3]">Transaction</dt>
                <dd className="break-all text-white">
                  <a
                    href={`https://bscscan.com/tx/${purchase.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e858b3] underline"
                  >
                    {purchase.tx_hash}
                  </a>
                </dd>
              </div>
              {purchase.verification_reason && purchase.status !== "VERIFIED" && (
                <div className="sm:col-span-2 lg:col-span-3">
                  <dt className="text-xs text-[#9a95a3]">Verification note</dt>
                  <dd className="text-white">{purchase.verification_reason}</dd>
                </div>
              )}
            </dl>

            {purchase.status === "PENDING" && (
              <button
                type="button"
                onClick={() => verify(purchase.id)}
                disabled={verifying === purchase.id}
                className="mt-5 rounded-full border border-[#e2469b] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {verifying === purchase.id ? "Checking..." : "Check verification"}
              </button>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
