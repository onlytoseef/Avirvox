"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const field =
  "mt-2 w-full rounded-xl border border-[#4b4654] bg-[#15121a] px-4 py-3 text-sm text-white placeholder:text-[#7f7888] focus:border-[#e2469b] focus:outline-none";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function sendCode(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup/start", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error ?? "Could not send the verification code.");
        return;
      }

      setStep("code");
      setNotice(
        data?.message ??
          "A 6-digit verification code has been sent to your email.",
      );
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function completeSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup/complete", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, code, password }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error ?? "Could not create your account.");
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
          Create Account
        </h1>

        {step === "email" ? (
          <form onSubmit={sendCode} className="mt-8 grid gap-4">
            <label className="text-sm text-[#e0dce4]">
              Email
              <input
                className={field}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <p className="text-xs leading-relaxed text-[#9a95a3]">
              We will send a 6-digit verification code to this email. You will
              set your password on the next step.
            </p>

            {error && <p className="text-xs text-[#f2a3b5]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 min-h-12 rounded-full bg-gradient-to-r from-[#ff9926] via-[#e84e91] to-[#8e25e7] text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Sending code..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={completeSignup} className="mt-8 grid gap-4">
            <div className="rounded-xl border border-[#4b4654] bg-[#15121a] px-4 py-3 text-sm text-[#e0dce4]">
              <span className="block text-xs text-[#9a95a3]">Code sent to</span>
              <span className="mt-1 block break-all text-white">{email}</span>
            </div>

            <label className="text-sm text-[#e0dce4]">
              6-digit code
              <input
                className={`${field} text-center text-lg tracking-[0.5em]`}
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{6}"
                maxLength={6}
                value={code}
                onChange={(event) =>
                  setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="000000"
                required
              />
            </label>

            <label className="text-sm text-[#e0dce4]">
              Password
              <input
                className={field}
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                required
              />
            </label>

            {error && <p className="text-xs text-[#f2a3b5]">{error}</p>}
            {notice && <p className="text-xs text-[#9be7b4]">{notice}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 min-h-12 rounded-full bg-gradient-to-r from-[#ff9926] via-[#e84e91] to-[#8e25e7] text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Verify & Create Account"}
            </button>

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setPassword("");
                  setError(null);
                  setNotice(null);
                }}
                className="text-[#e858b3] underline"
              >
                Change email
              </button>
              <button
                type="button"
                onClick={() => sendCode()}
                disabled={loading}
                className="text-[#c9bccf] underline disabled:opacity-50"
              >
                Resend code
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-xs text-[#9a95a3]">
          Already registered?{" "}
          <Link href="/login" className="text-[#e858b3] underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
