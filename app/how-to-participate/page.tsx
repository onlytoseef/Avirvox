import type { Metadata } from "next";
import { ParticipatePageContent } from "@/components/sections/participate-page";

export const metadata: Metadata = {
  title: "How to Participate | Avirox Labs",
  description:
    "Follow the official AVX participation process, from setting up your wallet through tracking and claiming your allocation.",
};

export default function HowToParticipatePage() {
  return <ParticipatePageContent />;
}
