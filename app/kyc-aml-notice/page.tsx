import type { Metadata } from "next";
import { DocumentPage, type DocumentSection } from "@/components/sections/document-page";
import sections from "@/lib/content/kyc-aml-notice.json";

export const metadata: Metadata = {
  title: "KYC / AML Notice | Avirvox Labs",
  description:
    "Official Avirvox Labs compliance and verification notice for AVX token sale participation, effective 19 October 2026.",
};

export default function KycAmlNoticePage() {
  return (
    <DocumentPage
      title="KYC / AML Notice"
      subtitle="Identity verification, compliance and screening procedures for AVX token sale participation."
      effectiveDate="19 October 2026"
      version="1.0"
      pdfHref="/kyc-aml-notice.pdf"
      sections={sections as DocumentSection[]}
    />
  );
}
