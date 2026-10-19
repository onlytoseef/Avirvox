import type { Metadata } from "next";
import { AvxPageContent } from "@/components/sections/avx-page";

export const metadata: Metadata = {
  title: "AVX | Avirox Labs",
  description:
    "Explore AVX, the fixed-supply utility token for the Avirox Labs ecosystem.",
};

export default function AvxPage() {
  return <AvxPageContent />;
}
