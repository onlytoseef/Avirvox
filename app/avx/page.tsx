import type { Metadata } from "next";
import { AvxPageContent } from "@/components/sections/avx-page";

export const metadata: Metadata = {
  title: "AVX | Avirvox Labs",
  description:
    "Explore AVX, the fixed-supply utility token for the Avirvox Labs ecosystem.",
};

export default function AvxPage() {
  return <AvxPageContent />;
}
