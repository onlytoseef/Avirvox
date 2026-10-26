import type { Metadata } from "next";
import { RoadmapPageContent } from "@/components/sections/roadmap-page";

export const metadata: Metadata = {
  title: "Roadmap | Avirvox Labs",
  description:
    "Explore the phased Avirvox Labs roadmap from sale readiness through AVX utility and ecosystem growth.",
};

export default function RoadmapPage() {
  return <RoadmapPageContent />;
}
