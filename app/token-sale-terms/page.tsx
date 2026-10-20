import type { Metadata } from "next";
import { DocumentPage, type DocumentSection } from "@/components/sections/document-page";
import sections from "@/lib/content/token-sale-terms.json";

export const metadata: Metadata = {
  title: "AVX Token Sale Terms | Avirvox Labs",
  description: "Official AVX token sale terms for private, strategic and public sale participation, effective 19 October 2026.",
};

export default function TokenSaleTermsPage() {
  return <DocumentPage title="AVX Token Sale Terms" subtitle="Official contractual terms for private, strategic and public AVX sale participation." effectiveDate="19 October 2026" version="1.0" pdfHref="/avx-token-sale-terms.pdf" sections={sections as DocumentSection[]} />;
}
