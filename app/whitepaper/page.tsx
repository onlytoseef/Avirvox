import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Whitepaper | Avirvox Labs",
  description:
    "Read or download the official Avirvox Labs whitepaper covering the ecosystem vision, structure and AVX utility token framework.",
};

const pdfHref = "/avirvox-labs-whitepaper.pdf";

export default function WhitepaperPage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-clip pt-36 pb-10 sm:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(ellipse_at_70%_0%,rgba(161,40,234,0.21),transparent_56%),radial-gradient(ellipse_at_15%_45%,rgba(238,74,159,0.12),transparent_48%)]"
      />
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Link href="/" className="text-sm font-medium text-rose transition-colors hover:text-white">
            ← Back to Home
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-rose">Documents & Legal</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">Whitepaper</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#c9bccf] sm:text-lg">
            Explore the Avirvox Labs vision, ecosystem structure, AVX utility and token framework.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={pdfHref}
              download
              className="inline-flex min-h-11 items-center rounded-full border border-rose/60 px-6 text-sm font-semibold text-white transition-colors hover:bg-rose/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
            >
              Download official PDF ↗
            </a>
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Open in new tab ↗
            </a>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[28px] border border-white/10 bg-[#110b1d]/80 shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
          <iframe
            src={pdfHref}
            title="Avirvox Labs Whitepaper"
            className="h-[85vh] w-full"
          />
        </div>
      </div>
    </main>
  );
}
