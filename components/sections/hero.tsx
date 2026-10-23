import type { CSSProperties } from "react";
import { Eyebrow, GradientButton, OutlineButton } from "@/components/ui/elements";
import { SaleCard } from "@/components/cards/sale-card";
import { AudienceStrip } from "@/components/ui/audience-strip";
import { heroContent, heroMetrics } from "@/lib/content/hero";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

function MetricValue({ value }: { value: string }) {
  const words = value.split(" ");
  if (words.length <= 2) return <>{value}</>;
  return (
    <>
      {words.slice(0, -1).join(" ")}
      <br />
      {words[words.length - 1]}
    </>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="overflow-hidden pb-[clamp(24px,3vw,43px)]"
    >
      <div className="relative pb-[clamp(32px,4vw,56px)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 85% 75% at 50% 100%, rgba(201,58,168,0.8) 0%, rgba(122,29,120,0.65) 40%, rgba(5,3,10,0) 78%), repeating-linear-gradient(90deg, rgba(5,3,10,0) 0px, rgba(5,3,10,0) 26px, rgba(52,17,57,0.55) 34px, rgba(52,17,57,0.55) 62px, rgba(5,3,10,0) 70px)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[url('/images/hero-bg.webp')] bg-cover bg-top" />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-start gap-10 px-5 pt-[clamp(100px,8vw,122px)] lg:grid-cols-[692fr_615fr] lg:gap-[clamp(24px,4vw,57px)] lg:px-[34px]">
        <div className="min-w-0 pt-6 lg:pt-[clamp(12px,2vw,24px)]">
          <Eyebrow className="self-start px-[clamp(8px,0.8vw,11px)] py-[clamp(4px,0.4vw,6px)] text-xs">
            {heroContent.eyebrow}
          </Eyebrow>

          <FadeIn>
            <h1 className="mt-[clamp(8px,1vw,14px)] bg-gradient-to-b from-[#fffdfc] via-[#ded2e4] to-[#9dbced] bg-clip-text font-[family-name:var(--font-display)] text-5xl leading-none font-normal tracking-tight text-transparent md:text-6xl lg:text-7xl 2">
              {heroContent.title[0]}
              <br />
              {heroContent.title[1]}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-[clamp(14px,1.5vw,21px)] text-base leading-snug font-semibold text-white md:text-lg xl:text-xl">
              {heroContent.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="mt-[clamp(14px,1.7vw,24px)] max-w-[640px] whitespace-pre-line text-sm leading-relaxed text-[#d9cfe0] md:text-base">
              {heroContent.description}
            </p>
          </FadeIn>

          <FadeIn
            delay={0.26}
            className="mt-[clamp(18px,1.8vw,26px)] flex flex-wrap gap-[clamp(10px,1.1vw,16px)]"
          >
            <GradientButton
              href="#ecosystem"
              className="min-h-[clamp(40px,3.8vw,55px)] min-w-[clamp(140px,14.9vw,215px)] text-xs sm:text-sm"
            >
              {heroContent.exploreLabel}
            </GradientButton>
            <OutlineButton
              href="/whitepaper"
              className="min-h-[clamp(40px,3.8vw,55px)] min-w-[clamp(140px,14.9vw,215px)] text-xs sm:text-sm"
            >
              {heroContent.whitepaperLabel}
            </OutlineButton>
          </FadeIn>

          <StaggerGroup className="mt-8 grid grid-cols-3 gap-x-[clamp(10px,1.8vw,26px)] gap-y-[clamp(8px,1vw,14px)] lg:mt-[clamp(18px,1.8vw,26px)]">
            {heroMetrics.map(({ value, label }, index) => (
              <StaggerItem key={value}>
                <div
                  className="hero-metric-card flex min-h-[clamp(72px,6.1vw,88px)] flex-col items-center justify-center rounded-[clamp(14px,1.5vw,22px)] border border-[#ac468e44] bg-[linear-gradient(180deg,#8d1b93_0%,#5a0f60_45%,#12061a_100%)] px-3 text-center shadow-[inset_0_1px_#ffffff40]"
                  style={{ "--metric-delay": `${index * 0.5}s` } as CSSProperties}
                >
                  <strong className="relative z-10 text-lg font-semibold leading-[1.1] text-white">
                    <MetricValue value={value} />
                  </strong>
                  <span className="relative z-10 mt-[clamp(2px,0.4vw,6px)] text-sm text-white/80">
                    {label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <FadeIn direction="right" delay={0.15} className="w-full lg:max-w-[min(615px,calc(77dvh-92px))] lg:justify-self-end">
          <SaleCard />
        </FadeIn>
      </div>
      </div>

      <AudienceStrip className="relative z-10 mt-[clamp(48px,6vw,80px)]" />
    </section>
  );
}
