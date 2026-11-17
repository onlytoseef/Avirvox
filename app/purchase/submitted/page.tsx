import Link from "next/link";

export const instant = false;

export default async function PurchaseSubmittedPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-24">
      <div className="rounded-[28px] border border-[#4d2e56] bg-[#0b0612] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-[#2c6a44] bg-[#0f2a1c] text-[#8ee0ab]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-8"
            aria-hidden="true"
          >
            <path
              d="M20 6 9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl text-[#f6eaf4]">
          Purchase Submitted
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#c9bccf] sm:text-base">
          Your purchase details have been submitted. Payment confirmation and
          AVX allocation are subject to verification.
        </p>

        {id && (
          <p className="mt-5 break-all rounded-xl border border-[#4b4654] bg-[#15121a] px-4 py-3 text-xs text-[#9a95a3]">
            Reference: <span className="text-[#e0dce4]">{id}</span>
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#ff9926] via-[#e84e91] to-[#8e25e7] px-7 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#50405f] px-7 text-sm font-semibold text-white transition hover:border-[#e2469b]"
          >
            View Dashboard
          </Link>
        </div>

        <p className="mt-6 text-xs text-[#9a95a3]">
          You can track the verification status of this purchase in your
          dashboard.
        </p>
      </div>
    </main>
  );
}
