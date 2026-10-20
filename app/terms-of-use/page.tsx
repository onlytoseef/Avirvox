import type { Metadata } from "next";
import { DocumentPage, type DocumentSection } from "@/components/sections/document-page";
import sections from "@/lib/content/terms-of-use.json";

export const metadata: Metadata = {
  title: "Terms of Use | Avirvox Labs",
  description:
    "Official terms governing use of the Avirvox Labs website and online services, effective 19 October 2026.",
};

export default function TermsOfUsePage() {
  return (
    <DocumentPage
      title="Terms of Use"
      subtitle="Website access, user responsibilities and applicable legal terms."
      effectiveDate="19 October 2026"
      version="1.0"
      pdfHref="/terms-of-use.pdf"
      sections={sections as DocumentSection[]}
    />
  );
}
