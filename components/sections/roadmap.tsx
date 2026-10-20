import { BrandMark } from "@/components/ui/brand";
import { Eyebrow } from "@/components/ui/elements";
import { roadmapContent, roadmapPhases } from "@/lib/content/roadmap";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export function Roadmap() {
  return (
    <section
      id="roadmap"
      className="mx-auto w-full max-w-[1344px] overflow-x-clip px-5 py-[clamp(64px,8vw,120px)] lg:px-8"
    >
      {/* ───────── Header ───────── */}
      <FadeIn className="flex flex-col items-center text-center">
        <Eyebrow>{roadmapContent.eyebrow}</Eyebrow>

        {/* 62px @ 1440 (same as Execution heading) */}
        <h2 className="mt-[clamp(12px,1.4vw,20px)] font-[family-name:var(--font-display)] text-[clamp(34px,4.3vw,62px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f6eaf4]">
          {roadmapContent.title}
        </h2>

        <div className="mt-3 h-[2px] w-[clamp(80px,7.8vw,112px)] bg-gradient-to-r from-[#ec468d] to-[#a026dd]" />

        <p className="mt-[clamp(12px,1.3vw,18px)] max-w-[700px] text-[clamp(14px,1.25vw,18px)] leading-[1.5] text-[#d9cfe0]">
          {roadmapContent.description}
        </p>
      </FadeIn>

      {/* ───────── Desktop diagram (lg+) ───────── */}
      <FadeIn delay={0.15} distance={32} className="relative mx-auto mt-[clamp(16px,2vw,28px)] hidden aspect-[699/400] w-full max-w-[1270px] lg:block">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute -inset-x-[8%] -inset-y-[6%]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 36% 52% at 50% 48%, rgba(125,40,70,0.55) 0%, rgba(70,20,80,0.35) 50%, rgba(5,3,10,0) 100%), radial-gradient(ellipse 40% 30% at 50% 100%, rgba(100,30,140,0.35) 0%, rgba(5,3,10,0) 100%)",
          }}
        />

        {/* Outer ring: 272/699 = 38.9% of width */}
        <div
          className="absolute aspect-square w-[38.9%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b9a3b6]/60 shadow-[0_0_80px_rgba(112,40,89,0.35)]"
          style={{
            left: "49.9%",
            top: "48.25%",
            backgroundImage:
              "radial-gradient(circle, rgba(60,20,50,0.9) 0%, rgba(42,16,40,0.9) 60%, rgba(25,11,29,0.9) 100%)",
          }}
        />

        {/* Inner dark circle: 173/699 = 24.7% */}
        <div
          className="absolute flex aspect-square w-[24.7%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-[#8d8a90]/70 bg-[#030303]"
          style={{ left: "49.9%", top: "48.25%" }}
        >
          <BrandMark className="h-auto w-[46%]" />
        </div>

        {roadmapPhases.map(({ number, title, description, num, card }) => (
          <div key={number}>
            {/* Number marker */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-[clamp(16px,2vw,29px)] font-medium tracking-wide text-white"
              style={{ left: `${num.x}%`, top: `${num.y}%` }}
            >
              {number}
            </div>

            {/* Card */}
            <div
              className="absolute rounded-[clamp(12px,1.4vw,20px)] border border-[#5b4a68] bg-[#0b0612] px-[1.1%] py-[0.9%] text-center shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
              style={{
                left: `${card.x}%`,
                top: `${card.y}%`,
                width: `${card.w}%`,
              }}
            >
              <h3 className="text-[clamp(9px,0.9vw,13px)] font-bold uppercase leading-[1.25] tracking-[0.03em] text-white">
                {title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-1 text-[clamp(7.5px,0.7vw,10px)] leading-[1.35] text-[#cfc6d6]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </FadeIn>

      {/* ───────── Mobile / tablet list ───────── */}
      <StaggerGroup className="mt-10 grid gap-3 lg:hidden">
        {roadmapPhases.map((phase) => (
          <StaggerItem
            key={phase.number}
            className="flex gap-5 rounded-2xl border border-[#5b4a68] bg-[#0b0612] p-5"
          >
            <span className="font-[family-name:var(--font-display)] text-4xl text-[#ec468d]">
              {phase.number}
            </span>
            <div>
              <h3 className="text-sm font-semibold uppercase text-white">
                {phase.title.join(" ")}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#cfc6d6]">
                {phase.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
