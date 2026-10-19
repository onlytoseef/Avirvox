import { AudienceStrip } from "@/components/ui/audience-strip";
import { Eyebrow, GradientButton, OutlineButton } from "@/components/ui/elements";
import {
  roadmapPageContent,
  roadmapPagePhases,
} from "@/lib/content/roadmap-page";
import { RoadmapPhaseCard } from "@/components/cards/roadmap-phase-card";

function RoadmapHero() {
  return (
    <section className="relative isolate -mt-[97px] overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_at_52%_0%,#79255488,transparent_61%),radial-gradient(ellipse_at_18%_0%,#db633b44,transparent_37%)]" />
      <div className="mx-auto min-w-0 max-w-[1440px] px-5 pt-[calc(clamp(100px,13vw,190px)+97px)]">
        <Eyebrow>{roadmapPageContent.eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-full font-[family-name:var(--font-display)] text-[clamp(2.2rem,8.1vw,8rem)] leading-[0.93] font-normal tracking-[-0.045em] uppercase">
          <span className="block text-[#f9edf5]">{roadmapPageContent.title[0]}</span>
          <span className="block bg-gradient-to-r from-[#ec4aab] via-[#b631d4] to-[#7830dd] bg-clip-text text-transparent">
            {roadmapPageContent.title[1]}
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-[760px] text-sm leading-[1.5] text-[#d4c8d7] sm:text-base">
          {roadmapPageContent.intro}
        </p>
      </div>
      <AudienceStrip size="large" className="mx-auto mt-[clamp(90px,10.5vw,155px)] max-w-[1500px] px-4 pb-[clamp(80px,7.3vw,105px)]" />
    </section>
  );
}

function TgeMilestone() {
  const { milestone } = roadmapPageContent;

  return (
    <section
      className="relative isolate flex min-h-[315px] flex-col items-center justify-center overflow-hidden rounded-[25px] border border-[#6a3a64] px-6 py-14 text-center"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 100%, rgba(226,41,155,0.72), transparent 62%), repeating-linear-gradient(90deg, rgba(20,5,26,0.96) 0px, rgba(75,16,69,0.88) 12px, rgba(15,4,22,0.98) 26px, rgba(115,27,93,0.7) 35px, rgba(16,4,23,0.98) 44px), linear-gradient(#140719,#28092d)",
      }}
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#08040e44,transparent_45%,#d9479b22)]" />
      <Eyebrow>{milestone.eyebrow}</Eyebrow>
      <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.8rem,5vw,5.3rem)] leading-none tracking-[-0.045em] text-white">
        {milestone.title}
      </h2>
      <p className="mt-4 text-[11px] font-semibold tracking-[0.11em] uppercase text-white/90 sm:text-xs">
        {milestone.phase}
      </p>
      <p className="mx-auto mt-5 max-w-[800px] text-xs leading-[1.5] text-white/85 sm:text-sm">
        {milestone.description}
      </p>
    </section>
  );
}

function RoadmapClosing() {
  const { closing } = roadmapPageContent;

  return (
    <section
      className="mx-auto mt-40 flex min-h-[425px] max-w-[1344px] flex-col items-center justify-center rounded-[25px] border border-[#514157] px-6 py-16 text-center"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 100% 100%, rgba(218,88,69,0.78), transparent 39%), radial-gradient(ellipse at 66% 100%, rgba(130,33,133,0.3), transparent 50%)",
      }}
    >
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.8rem,5.1vw,5.8rem)] leading-[0.98] tracking-[-0.04em] text-[#f7edf5]">
        {closing.title[0]}
        <br />
        {closing.title[1]}
      </h2>
      <div className="mt-6 h-px w-36 bg-gradient-to-r from-transparent via-[#ee4c9b] to-transparent" />
      <p className="mx-auto mt-6 max-w-[690px] text-sm leading-[1.5] text-[#d8ccdb] sm:text-base">
        {closing.description}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <GradientButton href={closing.primaryHref} className="min-w-40">
          {closing.primaryLabel}
        </GradientButton>
        <OutlineButton href={closing.secondaryHref} className="min-w-40">
          {closing.secondaryLabel}
        </OutlineButton>
      </div>
    </section>
  );
}

export function RoadmapPageContent() {
  return (
    <main>
      <RoadmapHero />

      <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-12 px-4 sm:px-6 lg:px-10">
        {roadmapPagePhases.slice(0, 2).map((phase) => (
          <RoadmapPhaseCard key={phase.number} phase={phase} />
        ))}

        <TgeMilestone />

        {roadmapPagePhases.slice(2).map((phase) => (
          <RoadmapPhaseCard key={phase.number} phase={phase} />
        ))}
      </div>

      <p className="mx-auto mt-28 max-w-[720px] px-5 text-center text-sm leading-[1.5] text-[#cec1d3]">
        {roadmapPageContent.disclaimer}
      </p>

      <div className="px-4 sm:px-6 lg:px-8">
        <RoadmapClosing />
      </div>
    </main>
  );
}
