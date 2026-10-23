import { AudienceStrip } from "@/components/ui/audience-strip";
import { ArchitectureCard } from "@/components/cards/architecture-card";
import { ParticipantGroupCard } from "@/components/cards/participant-group-card";
import { Eyebrow, GradientButton, OutlineButton } from "@/components/ui/elements";
import {
  ecosystemPageContent,
  ecosystemRoles,
  operatingPrinciples,
  participantGroups,
  participationBenefits,
} from "@/lib/content/ecosystem-page";
import { FadeIn } from "@/components/motion/fade-in";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { PageParticles } from "@/components/sections/page-particles";

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight text-[#f6edf5] md:text-5xl xl:text-6xl">
        {title}
      </h2>
      <div className="mx-auto mt-6 h-[2px] w-48 bg-[#e446a8]" />
    </div>
  );
}

function EcosystemHero() {
  return (
    <section className="relative isolate -mt-[97px] overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_52%_0%,#a43d7777,transparent_62%),radial-gradient(ellipse_at_22%_0%,#cc603a44,transparent_42%)]" />
      <FadeIn className="mx-auto max-w-[1440px] px-5 pt-[calc(clamp(100px,13vw,190px)+97px)]">
        <Eyebrow>{ecosystemPageContent.eyebrow}</Eyebrow>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight uppercase sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-[#f3e8f2]">Participation, Utility</span>
          <span className="block text-[#f3e8f2]">
            And Clear{" "}
            <span className="bg-gradient-to-r from-[#e35c80] to-[#ca38b5] bg-clip-text text-transparent">
              Enterprise
            </span>
          </span>
          <span className="block bg-gradient-to-r from-[#d744ba] to-[#a02ce5] bg-clip-text text-transparent">
            Boundaries
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-[1000px] text-base leading-relaxed text-[#d4c8d7] lg:text-lg">
          {ecosystemPageContent.introduction}
        </p>
      </FadeIn>
      <AudienceStrip
        size="large"
        className="mx-auto mt-[clamp(90px,10.5vw,155px)] max-w-[1500px] px-4 pb-[clamp(80px,7.3vw,105px)]"
      />
    </section>
  );
}

function EcosystemArchitecture() {
  const { architecture } = ecosystemPageContent;
  const arcPath = "M1 493 A404 493 0 0 1 809 493";

  return (
    <section className="relative mx-auto max-w-[1440px] px-5 pt-28 sm:px-10 lg:pt-[145px]">
      <div className="ecosystem-page-arc" aria-hidden="true">
        <svg viewBox="0 0 810 495" preserveAspectRatio="none" fill="none">
          <circle className="ecosystem-travel-dot" r="2.5" fill="#fff">
            <animateMotion path={arcPath} dur="5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <FadeIn className="relative text-center">
        <Eyebrow>{architecture.eyebrow}</Eyebrow>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight md:text-5xl xl:text-6xl">
          {architecture.title[0]}
          <br />
          {architecture.title[1]}
        </h2>
        <div className="mx-auto mt-6 h-[2px] w-48 bg-[#e446a8]" />
        <p className="mx-auto mt-7 max-w-[520px] text-base leading-relaxed text-[#d4c8d7] lg:text-lg">
          {architecture.description}
        </p>
      </FadeIn>
      <StaggerGroup className="relative mt-32 grid gap-5 md:grid-cols-3 lg:mt-[195px]">
        {ecosystemRoles.map((role) => (
          <StaggerItem key={role.id}>
            <TiltCard className="group rounded-[24px]">
              <ArchitectureCard role={role} />
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function ParticipationWave() {
  const wavePath = "M16 52 C130 4 240 4 358 52 S590 100 710 52 S940 4 1062 52 S1250 100 1360 52";

  return (
    <svg
      className="mt-14 hidden h-[100px] w-full md:block"
      viewBox="0 0 1360 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ecosystem-wave" x1="0" y1="0" x2="1360" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff901e" />
          <stop offset="0.48" stopColor="#b22ae8" />
          <stop offset="0.7" stopColor="#fa7b27" />
          <stop offset="1" stopColor="#9d27dd" />
        </linearGradient>
        <linearGradient id="ecosystem-dot" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ff9a22" />
          <stop offset="1" stopColor="#ad2fe8" />
        </linearGradient>
      </defs>
      <path d={wavePath} stroke="url(#ecosystem-wave)" strokeWidth="2" />
      <circle className="ecosystem-travel-dot" r="2.5" fill="#fff">
        <animateMotion path={wavePath} dur="5s" repeatCount="indefinite" />
      </circle>
      {[16, 358, 710, 1062].map((x) => (
        <g key={x}>
          <circle cx={x} cy="52" r="16" fill="#551193" />
          <circle cx={x} cy="52" r="10" fill="url(#ecosystem-dot)" />
        </g>
      ))}
    </svg>
  );
}

function ParticipationBenefits() {
  const { participation } = ecosystemPageContent;

  return (
    <section className="mx-auto mt-32 max-w-[1440px] px-5 sm:px-10">
      <FadeIn>
        <SectionHeading eyebrow={participation.eyebrow} title={participation.title} />
        <ParticipationWave />
      </FadeIn>
      <StaggerGroup className="mt-10 grid gap-9 md:mt-2 md:grid-cols-4 md:gap-10">
        {participationBenefits.map((benefit, index) => (
          <StaggerItem key={benefit.title} className={index % 2 === 1 ? "md:pt-12" : ""}>
            <article>
              <h3 className="max-w-[270px] text-xl leading-tight font-semibold text-white lg:text-2xl">
                {benefit.title}
              </h3>
              <p className="mt-5 max-w-[310px] text-sm leading-relaxed text-[#e2d8e3] sm:text-base">
                {benefit.description}
              </p>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function ParticipantGroups() {
  const { participants } = ecosystemPageContent;

  return (
    <section className="mx-auto mt-24 max-w-[1440px] px-5 sm:px-10">
      <StaggerGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StaggerItem className="lg:row-span-2">
          <div className="ecosystem-page-participant-feature flex min-h-[610px] flex-col justify-end rounded-[30px] p-7">
            <Eyebrow className="self-start">{participants.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight text-white md:text-5xl 2xl:text-6xl">
              Participant<br />Groups
            </h2>
            <GradientButton href="/how-to-participate" className="mt-8 self-start px-10">
              {participants.action}
            </GradientButton>
          </div>
        </StaggerItem>
        {participantGroups.map((group) => (
          <StaggerItem key={group.id}>
            <TiltCard className="group rounded-[24px]">
              <ParticipantGroupCard group={group} />
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function OperatingPrinciples() {
  const { principles } = ecosystemPageContent;

  return (
    <section className="mx-auto mt-36 max-w-[1440px] px-5 pb-12 sm:px-10">
      <FadeIn>
        <SectionHeading eyebrow={principles.eyebrow} title={principles.title} />
      </FadeIn>
      <StaggerGroup className="mt-20 grid gap-x-16 gap-y-10 md:grid-cols-3">
        {operatingPrinciples.map((principle) => (
          <StaggerItem key={principle.number}>
            <article className="flex min-h-[235px] flex-col border-b-2 border-[#b8349f] pb-4">
              <span className="bg-gradient-to-b from-[#603021] to-[#3e105e] bg-clip-text text-6xl leading-none font-bold text-transparent lg:text-7xl">
                {principle.number}.
              </span>
              <h3 className="mt-4 min-h-12 text-xl leading-tight font-semibold uppercase text-white lg:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-3 max-w-[380px] text-sm leading-relaxed text-[#e1d7e3] sm:text-base">
                {principle.description}
              </p>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <FadeIn delay={0.1} className="mt-16 flex flex-wrap justify-center gap-4">
        <GradientButton href="/avx" className="min-w-48">Explore AVX</GradientButton>
        <OutlineButton href="/about#resources" className="min-w-48">View Eligibility</OutlineButton>
      </FadeIn>
    </section>
  );
}

export function EcosystemPageContent() {
  return (
    <main className="particle-page">
      <PageParticles />
      <EcosystemHero />
      <EcosystemArchitecture />
      <ParticipationBenefits />
      <ParticipantGroups />
      <OperatingPrinciples />
    </main>
  );
}
