import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about-page";

export const metadata: Metadata = {
  title: "About Avirox Labs | Resources & Leadership",
  description:
    "Learn about Avirox Labs, its leadership, AVX resources, verification information, FAQs and official contact channels.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
