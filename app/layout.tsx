import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { instrumentSerif, poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Avirvox Labs | The Participation Layer",
  description:
    "Avirvox Labs connects creators, contributors, developers, partners and communities through an open participation ecosystem.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`min-h-full ${poppins.className} ${instrumentSerif.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
