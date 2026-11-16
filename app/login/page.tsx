"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const field =
  "mt-2 w-full rounded-xl border border-[#4b4654] bg-[#15121a] px-4 py-3 text-sm text-white placeholder:text-[#7f7888] focus:border-[#e2469b] focus:outline-none";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error ?? "Login failed.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-24">
      <div className="rounded-[28px] border border-[#4d2e56] bg-[#0b0612] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e858b3]">
          Avirvox Labs
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[#f6eaf4]">
          Purchaser Login
        </h1>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <label className="text-sm text-[#e0dce4]">
            Email
            <input
              className={field}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="text-sm text-[#e0dce4]">
            Password
            <input
              className={field}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className="text-xs text-[#f2a3b5]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 min-h-12 rounded-full bg-gradient-to-r from-[#ff9926] via-[#e84e91] to-[#8e25e7] text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-xs text-[#9a95a3]">
          No account?{" "}
          <Link href="/register" className="text-[#e858b3] underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
