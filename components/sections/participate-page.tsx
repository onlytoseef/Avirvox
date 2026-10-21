import { FaBitcoin } from "react-icons/fa6";
import { FiCheckSquare, FiMonitor, FiRepeat, FiUserCheck } from "react-icons/fi";
import { PiWallet } from "react-icons/pi";
import type { IconType } from "react-icons";
import { AudienceStrip } from "@/components/ui/audience-strip";
import { Eyebrow, GradientButton } from "@/components/ui/elements";
import { SecurityCard } from "@/components/cards/security-card";
import {
  participatePageContent,
  participationSteps,
} from "@/lib/content/participate-page";
import { FadeIn } from "@/components/motion/fade-in";
import { ScaleIn } from "@/components/motion/scale-in";
import { TiltCard } from "@/components/motion/tilt-card";
import { PageParticles } from "@/components/sections/page-particles";

type ParticipationStep = (typeof participationSteps)[number];

const stepIcons: Record<string, IconType> = {
  "01": FiUserCheck,
  "02": FaBitcoin,
  "03": PiWallet,
  "04": FiRepeat,
  "05": FiCheckSquare,
  "06": FiMonitor,
};

function ParticipationHero() {
  return (
    <section className="relative isolate -mt-[97px] overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[570px] bg-[radial-gradient(ellipse_at_50%_0%,#a13a6999,transparent_58%),radial-gradient(ellipse_at_18%_0%,#c4513244,transparent_38%)]" />
      <FadeIn className="mx-auto max-w-[1440px] px-5 pt-[calc(clamp(100px,13vw,190px)+97px)]">
        <Eyebrow>{participatePageContent.eyebrow}</Eyebrow>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-none font-normal tracking-tight uppercase sm:text-5xl md:text-6xl lg:text-7xl ">
          <span className="block text-[#f9edf5]">{participatePageContent.title[0]}</span>
          <span className="block bg-gradient-to-r from-[#eb49ae] via-[#b734d2] to-[#7930dc] bg-clip-text text-transparent">
            {participatePageContent.title[1]}
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-[760px] text-sm leading-relaxed text-[#d4c8d7] sm:text-base">
          {participatePageContent.introduction}
        </p>
      </FadeIn>
      <AudienceStrip
        size="large"
        className="mx-auto mt-[clamp(90px,10.5vw,155px)] max-w-[1500px] px-4 pb-[clamp(65px,6vw,90px)]"
      />
    </section>
  );
}

function StepIllustration({ step }: { step: ParticipationStep }) {
  const Icon = stepIcons[step.number];

  return (
    <TiltCard
      strength={12}
      aria-label={`${step.title} icon`}
      role="img"
      className="group relative flex size-22 shrink-0 items-center justify-center overflow-hidden rounded-[30px] border border-[#5b2377] bg-[#0d0516] shadow-[inset_0_0_0_5px_#220c35,0_0_25px_#70128022] lg:size-26"
    >
      <Icon
        aria-hidden="true"
        className={`size-7 drop-shadow-[0_0_14px_#ac2cc766] lg:size-10 ${step.number === "02" ? "rounded-full border-[3px] border-[#d942ba] p-2" : ""}`}
        style={
          step.number === "02" || step.number === "03"
            ? { fill: "url(#participation-step-gradient)" }
            : { stroke: "url(#participation-step-gradient)" }
        }
      />
    </TiltCard>
  );
}

function ParticipationStepRow({ step, last }: { step: ParticipationStep; last: boolean }) {
  return (
    <FadeIn className="grid min-h-[440px] gap-8 sm:grid-cols-[170px_minmax(0,1fr)] lg:min-h-[505px] lg:grid-cols-[280px_minmax(0,1fr)_200px] lg:gap-10">
      <div className="relative flex gap-4 sm:gap-5">
        <div className="relative flex w-3 shrink-0 justify-center pt-2">
          <span className="z-10 size-3 rounded-full bg-gradient-to-br from-[#ff9a22] via-[#e84aa9] to-[#962be5] shadow-[0_0_0_5px_#3a0c4d,0_0_13px_#df32df]" />
          {!last && <span className="absolute top-8 bottom-0 w-px bg-gradient-to-b from-[#ff9a22] via-[#e84aa9] to-[#962be5]" />}
        </div>
        <span className="pt-0.5 text-xs text-[#b8abbc] sm:text-sm">{step.label}</span>
      </div>

      <div className="min-w-0 pb-16 sm:pb-20">
        <h2 className="font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight text-[#f6eaf3] md:text-5xl">
          <span className="bg-gradient-to-b from-[#ff9a22] via-[#e84aa9] to-[#962be5] bg-clip-text text-transparent">
            {step.number}.
          </span>{" "}
          {step.title}
        </h2>
        <div className="mt-6 h-px w-48 bg-[#d13b95]" />

        <div className="mt-10 max-w-[560px] space-y-5 text-sm leading-relaxed font-medium text-[#e5dce7] sm:text-base">
          {step.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {"details" in step && step.details && (
            <ul className="list-disc pl-5">
              {step.details.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
        </div>

        <p className="mt-10 max-w-[590px] border-l-2 border-[#b22a85] py-1 pl-5 text-sm leading-relaxed whitespace-pre-line text-[#aa9bac] italic sm:text-base">
          {step.note}
        </p>

        {"action" in step && step.action && (
          <GradientButton href={step.action.href} size="sm" className="mt-9 min-w-36">
            {step.action.label}
          </GradientButton>
        )}
        <div className="mt-9 lg:hidden">
          <StepIllustration step={step} />
        </div>
      </div>

      <div className="hidden lg:flex lg:justify-end">
        <StepIllustration step={step} />
      </div>
    </FadeIn>
  );
}

export function ParticipatePageContent() {
  return (
    <main className="particle-page">
      <PageParticles />
      <svg className="absolute size-0" aria-hidden="true">
        <defs>
          <linearGradient id="participation-step-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff9a22" />
            <stop offset="50%" stopColor="#e84aa9" />
            <stop offset="100%" stopColor="#962be5" />
          </linearGradient>
        </defs>
      </svg>
      <ParticipationHero />
      <div className="mx-auto max-w-[1250px] px-5 sm:px-7 lg:px-10">
        {participationSteps.map((step, index) => (
          <ParticipationStepRow key={step.number} step={step} last={index === participationSteps.length - 1} />
        ))}
        <ScaleIn>
          <SecurityCard />
        </ScaleIn>
      </div>
    </main>
  );
}
