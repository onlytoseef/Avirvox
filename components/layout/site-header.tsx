"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import { headerAction, headerLinks } from "@/lib/content/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isActiveLink = (href: string) => href === pathname;

  return (
    <header className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-5 bg-transparent px-5 py-5 lg:px-[30px] lg:py-[33px]">
      <Brand />
      <nav
        className="hidden items-center gap-[clamp(24px,3.2vw,46px)] rounded-full border border-[#3b2a47] bg-[#07040c]/90 px-[clamp(18px,1.8vw,26px)] py-[clamp(12px,1.25vw,18px)] text-[clamp(11px,1.05vw,15px)] leading-none text-white lg:flex"
        aria-label="Main navigation"
      >
        {headerLinks.map(([name, href]) => (
          <Link
            key={name}
            href={href}
            className={`whitespace-nowrap transition-colors ${
              isActiveLink(href) ? "text-rose" : "hover:text-rose"
            }`}
          >
            {name}
          </Link>
        ))}
      </nav>
      <div className="hidden sm:block">
        <Button
          href={headerAction.href}
          size="sm"
          className="min-h-[clamp(40px,3.95vw,57px)] px-[clamp(20px,2.4vw,34px)] text-[clamp(11px,0.97vw,14px)] font-semibold"
        >
          {headerAction.label}
        </Button>
      </div>
      <details className="group relative lg:hidden">
        <summary className="flex min-h-10 list-none items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose">
          Menu
          <span
            aria-hidden="true"
            className="size-1.5 rotate-45 border-r border-b border-white/80 transition-transform group-open:rotate-[225deg]"
          />
        </summary>
        <nav
          className="absolute top-full right-0 mt-3 grid w-52 gap-4 rounded-2xl border border-line bg-[#140b1d] p-5 text-xs shadow-xl"
          aria-label="Mobile navigation"
        >
          {headerLinks.map(([name, href]) => (
            <Link
              key={name}
              href={href}
              className={isActiveLink(href) ? "text-rose" : "hover:text-rose"}
            >
              {name}
            </Link>
          ))}
          <Button href={headerAction.href} size="sm" className="mt-1">
            {headerAction.label}
          </Button>
        </nav>
      </details>
    </header>
  );
}
