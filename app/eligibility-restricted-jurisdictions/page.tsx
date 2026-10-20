import type { Metadata } from "next";
import { DocumentPage, type DocumentSection } from "@/components/sections/document-page";
import sections from "@/lib/content/eligibility-restricted-jurisdictions.json";

export const metadata: Metadata = {
  title: "Eligibility & Restricted Jurisdictions | Avirvox Labs",
  description:
    "Official participant eligibility and restricted jurisdictions policy for the AVX token sale, effective 19 October 2026.",
};

export default function EligibilityRestrictedJurisdictionsPage() {
  return (
    <DocumentPage
      title="Eligibility & Restricted Jurisdictions"
      subtitle="Participation requirements and jurisdictional restrictions for the AVX token sale."
      effectiveDate="19 October 2026"
      version="1.0"
      pdfHref="/eligibility-restricted-jurisdictions.pdf"
      sections={sections as DocumentSection[]}
    />
  );
}
