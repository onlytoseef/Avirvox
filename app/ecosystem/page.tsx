import type { Metadata } from "next";
import { EcosystemPageContent } from "@/components/sections/ecosystem-page";

export const metadata: Metadata = {
  title: "Ecosystem | Avirvox Labs",
  description:
    "Explore the Avirvox Labs participation ecosystem, its distinct roles, participant groups and operating principles.",
};

export default function EcosystemPage() {
  return <EcosystemPageContent />;
}
