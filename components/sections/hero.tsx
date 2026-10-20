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
      className="relative overflow-hidden pb-[clamp(24px,3vw,43px)]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(520px,57.8vw,832px)]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 85% 75% at 50% 100%, rgba(201,58,168,0.8) 0%, rgba(122,29,120,0.65) 40%, rgba(5,3,10,0) 78%), repeating-linear-gradient(90deg, rgba(5,3,10,0) 0px, rgba(5,3,10,0) 26px, rgba(52,17,57,0.55) 34px, rgba(52,17,57,0.55) 62px, rgba(5,3,10,0) 70px)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(520px,57.8vw,832px)] bg-[url('/images/hero-bg.webp')] bg-cover bg-top" />

      <div className="relative mx-auto grid max-w-[1440px] items-start gap-10 px-5 pt-[clamp(110px,11.1vw,160px)] lg:grid-cols-[692fr_615fr] lg:gap-[clamp(24px,4vw,57px)] lg:px-[34px]">
        <div className="min-w-0 pt-6 lg:pt-[clamp(24px,4.4vw,63px)]">
          <Eyebrow className="self-start px-[clamp(8px,0.9vw,13px)] py-[clamp(4px,0.5vw,7px)] text-[clamp(10px,1.25vw,18px)]">
            {heroContent.eyebrow}
          </Eyebrow>

          <FadeIn>
            <h1 className="mt-[clamp(8px,1vw,14px)] bg-gradient-to-b from-[#fffdfc] via-[#ded2e4] to-[#9dbced] bg-clip-text font-[family-name:var(--font-display)] text-[clamp(52px,7.92vw,114px)] font-normal leading-[0.94] tracking-[-0.026em] text-transparent">
              {heroContent.title[0]}
              <br />
              {heroContent.title[1]}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-[clamp(14px,1.5vw,21px)] text-[clamp(16px,1.67vw,24px)] font-semibold leading-[1.3] text-white">
              {heroContent.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="mt-[clamp(14px,1.7vw,24px)] max-w-[640px] whitespace-pre-line text-[clamp(13px,0.97vw,14px)] leading-[1.4] text-[#d9cfe0]">
              {heroContent.description}
            </p>
          </FadeIn>

          <FadeIn
            delay={0.26}
            className="mt-[clamp(18px,1.8vw,26px)] flex flex-wrap gap-[clamp(10px,1.1vw,16px)]"
          >
            <GradientButton
              href="#ecosystem"
              className="min-h-[clamp(40px,3.8vw,55px)] min-w-[clamp(140px,14.9vw,215px)] text-[clamp(11px,1vw,15px)]"
            >
              {heroContent.exploreLabel}
            </GradientButton>
            <OutlineButton
              href="#resources"
              className="min-h-[clamp(40px,3.8vw,55px)] min-w-[clamp(140px,14.9vw,215px)] text-[clamp(11px,1vw,15px)]"
            >
              {heroContent.whitepaperLabel}
            </OutlineButton>
          </FadeIn>

          <StaggerGroup className="mt-12 grid grid-cols-3 gap-x-[clamp(10px,1.8vw,26px)] gap-y-[clamp(10px,1.7vw,24px)] lg:mt-[clamp(40px,9.6vw,138px)]">
            {heroMetrics.map(({ value, label }) => (
              <StaggerItem
                key={value}
                className="flex min-h-[clamp(96px,9.6vw,138px)] flex-col items-center justify-center rounded-[clamp(14px,1.5vw,22px)] border border-[#ac468e44] bg-[linear-gradient(180deg,#8d1b93_0%,#5a0f60_45%,#12061a_100%)] px-3 text-center shadow-[inset_0_1px_#ffffff40]"
              >
                <strong className="text-[clamp(16px,1.95vw,28px)] font-semibold leading-[1.1] text-white">
                  <MetricValue value={value} />
                </strong>
                <span className="mt-[clamp(2px,0.4vw,6px)] text-[clamp(9px,1.05vw,15px)] text-white/80">
                  {label}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <FadeIn direction="right" delay={0.15} className="w-full lg:max-w-[615px] lg:justify-self-end">
          <SaleCard />
        </FadeIn>
      </div>

      <AudienceStrip className="relative mt-[clamp(48px,9.2vw,133px)]" />
    </section>
  );
}
