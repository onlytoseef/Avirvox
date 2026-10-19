import Image from "next/image";
import type { RoadmapPageVisual } from "@/lib/content/roadmap-page";

const visualLabels: Record<RoadmapPageVisual, string> = {
  foundation: "Foundation and infrastructure illustration placeholder",
  presale: "Presale and public rounds illustration placeholder",
  utility: "AVX utility illustration placeholder",
  ecosystem: "Ecosystem participation illustration placeholder",
  market: "Future market access illustration placeholder",
};

export function RoadmapVisual({ kind }: { kind: RoadmapPageVisual }) {
  return (
    <div className="relative aspect-[1.5] w-full min-w-0 overflow-hidden rounded-[22px] border border-[#4a4052] bg-[#08070e] shadow-[inset_0_0_70px_#241a2b66]">
      <Image
        src={`/assets/roadmap/${kind}.svg`}
        alt={visualLabels[kind]}
        fill
        sizes="(max-width: 767px) 100vw, 50vw"
        className="object-contain"
      />
      {kind === "presale" && (
        <Image
          src="/assets/images/logo-simple.png"
          alt=""
          width={178}
          height={161}
          className="pointer-events-none absolute top-1/2 left-1/2 h-auto w-[16%] -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}
