import type { Metadata } from "next";
import { RoadmapPageContent } from "@/components/sections/roadmap-page";

export const metadata: Metadata = {
  title: "Roadmap | Avirox Labs",
  description:
    "Explore the phased Avirox Labs roadmap from sale readiness through AVX utility and ecosystem growth.",
};

export default function RoadmapPage() {
  return <RoadmapPageContent />;
}
