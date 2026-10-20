import { Eyebrow } from "@/components/ui/elements";
import { DonutChart } from "@/components/charts/avx-donut-chart";
import {
  avxContent,
  avxLeaderLines,
  avxPills,
  avxSegments,
} from "@/lib/content/avx";
import { FadeIn } from "@/components/motion/fade-in";

export function Avx() {
  return (
    <section
      id="avx"
      className="mx-auto w-full max-w-[1390px] overflow-x-clip px-5 py-[clamp(64px,8vw,120px)] lg:px-8"
    >
      {/* ───────── Header ───────── */}
      <FadeIn className="flex flex-col items-center text-center">
        <Eyebrow>{avxContent.eyebrow}</Eyebrow>

        {/* 62px @ 1440 */}
        <h2 className="mt-[clamp(12px,1.4vw,20px)] font-[family-name:var(--font-display)] text-[clamp(32px,4.3vw,62px)] font-normal leading-[1.08] tracking-[-0.02em] text-[#f6eaf4]">
          {avxContent.title[0]}
          <br />
          {avxContent.title[1]}
        </h2>

        <div className="mt-3 h-[2px] w-[clamp(100px,13vw,190px)] bg-gradient-to-r from-[#ec468d] to-[#a026dd]" />

        <p className="mt-[clamp(12px,1.3vw,18px)] max-w-[790px] text-[clamp(14px,1.25vw,18px)] leading-[1.5] text-[#d9cfe0]">
          {avxContent.description}
        </p>
      </FadeIn>

      {/* ───────── Desktop diagram (lg+) ───────── */}
      <FadeIn delay={0.15} direction="up" distance={32} className="relative mx-auto mt-[clamp(16px,2vw,29px)] hidden aspect-[643/265] w-full max-w-[1326px] lg:block">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute -inset-x-[6%] -inset-y-[10%]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 32% 55% at 53% 52%, rgba(110,35,110,0.55) 0%, rgba(60,18,70,0.35) 45%, rgba(5,3,10,0) 100%)",
          }}
        />

        {/* Leader lines */}
        <svg
          viewBox="0 0 643 265"
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden="true"
        >
          {avxLeaderLines.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Chart: diameter 203/643 = 31.6%, center (53%, 48.3%) */}
        <DonutChart
          className="absolute aspect-square w-[31.6%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_60px_rgba(160,33,145,0.4)]"
          style={{ left: "53%", top: "48.3%" }}
        />

        {/* Pills */}
        {avxPills.map(({ text, x, y, w, h }) => (
          <div
            key={text}
            className="absolute flex items-center justify-center whitespace-nowrap rounded-full border border-[#4d3c57] bg-[#0b0612] text-[clamp(11px,1.4vw,20px)] font-medium text-[#f4e8f2] shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${w}%`,
              height: `${h}%`,
            }}
          >
            {text}
          </div>
        ))}
      </FadeIn>

      {/* ───────── Mobile / tablet ───────── */}
      <FadeIn delay={0.15} className="mt-10 lg:hidden">
        <div className="relative mx-auto aspect-square w-full max-w-[360px] drop-shadow-[0_0_50px_rgba(160,33,145,0.4)]">
          <DonutChart className="size-full" />
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[...avxSegments]
            .sort((a, b) => b.percent - a.percent)
            .map(({ text, color }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-full border border-[#4d3c57] bg-[#0b0612] px-5 py-3 text-sm font-medium text-[#f4e8f2]"
              >
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {text}
              </li>
            ))}
        </ul>
      </FadeIn>
    </section>
  );
}
