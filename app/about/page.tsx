import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about-page";

export const metadata: Metadata = {
  title: "About Avirvox Labs | Resources & Leadership",
  description:
    "Learn about Avirvox Labs, its leadership, AVX resources, verification information, FAQs and official contact channels.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
