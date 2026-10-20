import type { Metadata } from "next";
import { DocumentPage, type DocumentSection } from "@/components/sections/document-page";
import sections from "@/lib/content/privacy-cookie-policy.json";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy | Avirvox Labs",
  description:
    "Official Avirvox Labs privacy and cookie policy covering personal information, AVX participation and website technologies, effective 19 October 2026.",
};

export default function PrivacyCookiePolicyPage() {
  return (
    <DocumentPage
      title="Privacy & Cookie Policy"
      subtitle="How Avirvox Labs handles personal information and uses website technologies."
      effectiveDate="19 October 2026"
      version="1.0"
      pdfHref="/privacy-cookie-policy.pdf"
      sections={sections as DocumentSection[]}
    />
  );
}
