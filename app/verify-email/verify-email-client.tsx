"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "ok" | "error";

export function VerifyEmailClient({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>(token ? "loading" : "error");
  const [message, setMessage] = useState(
    token ? "" : "Missing verification token.",
  );

  useEffect(() => {
    if (!token) return;

    let active = true;

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!active) return;
        if (response.ok) {
          setStatus("ok");
          setMessage("Your email has been verified. You can now log in.");
        } else {
          setStatus("error");
          setMessage(data?.error ?? "Verification failed.");
        }
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
        setMessage("Network error. Please try again.");
      });

    return () => {
      active = false;
    };
  }, [token]);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-24">
      <div className="rounded-[28px] border border-[#4d2e56] bg-[#0b0612] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e858b3]">
          Avirvox Labs
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[#f6eaf4]">
          Email Verification
        </h1>

        <p
          className={`mt-6 text-sm ${
            status === "ok"
              ? "text-[#9be7b4]"
              : status === "error"
                ? "text-[#f2a3b5]"
                : "text-[#c9bccf]"
          }`}
        >
          {status === "loading" ? "Verifying..." : message}
        </p>

        <div className="mt-8 flex justify-center gap-3 text-sm">
          <Link href="/login" className="rounded-full border border-[#50405f] px-5 py-2 text-white">
            Log in
          </Link>
          <Link href="/" className="rounded-full border border-[#50405f] px-5 py-2 text-white">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
