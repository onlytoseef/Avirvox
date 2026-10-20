import type { Metadata } from "next";
import { DocumentPage, type DocumentSection } from "@/components/sections/document-page";
import sections from "@/lib/content/accessibility-statement.json";

export const metadata: Metadata = {
  title: "Accessibility Statement | Avirvox Labs",
  description:
    "Avirvox Labs accessibility statement for its website and online services, effective 19 October 2026.",
};

export default function AccessibilityStatementPage() {
  return (
    <DocumentPage
      title="Accessibility Statement"
      subtitle="Our approach to making the website and online services more accessible."
      effectiveDate="19 October 2026"
      version="1.0"
      pdfHref="/accessibility-statement.pdf"
      sections={sections as DocumentSection[]}
    />
  );
}
