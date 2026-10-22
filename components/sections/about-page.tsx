import Image from "next/image";
import { FiCopy, FiShield } from "react-icons/fi";
import type { ReactNode } from "react";
import { AudienceStrip } from "@/components/ui/audience-strip";
import { LeadershipCard } from "@/components/cards/leadership-card";
import { ChannelCard } from "@/components/cards/channel-card";
import { Eyebrow } from "@/components/ui/elements";
import {
  aboutPageContent,
  aboutQuestions,
  leadershipTeam,
  officialChannels,
  tokenFacts,
} from "@/lib/content/about-page";
import { AboutContactForm } from "./about-contact-form";
import { AboutResources } from "./about-resources";
import { FadeIn } from "@/components/motion/fade-in";
import { ScaleIn } from "@/components/motion/scale-in";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { PageParticles } from "@/components/sections/page-particles";

function SectionHeading({
  eyebrow,
  children,
  description,
}: {
  eyebrow: string;
  children: ReactNode;
  description?: string;
}) {
  return (
    <div className="text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight text-[#f7edf5] md:text-5xl xl:text-6xl">
        {children}
      </h2>
      <div className="mx-auto mt-6 h-[2px] w-48 bg-[#e446a8]" />
      {description && (
        <p className="mx-auto mt-6 max-w-[720px] text-sm leading-relaxed text-[#d2c6d5] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function AboutHero() {
  const { hero } = aboutPageContent;

  return (
    <section className="relative isolate -mt-[97px] overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[570px] bg-[radial-gradient(ellipse_at_50%_0%,#a43c7977,transparent_60%),radial-gradient(ellipse_at_20%_0%,#c7603c44,transparent_39%)]" />
      <FadeIn className="mx-auto max-w-[1440px] px-5 pt-[calc(clamp(100px,13vw,190px)+97px)]">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight uppercase sm:text-5xl md:text-6xl lg:text-7xl ">
          <span className="block text-[#f5eaf4]">Building The Participation</span>
          <span className="block text-[#f5eaf4]">
            Layer For The{" "}
            <span className="bg-gradient-to-r from-[#e45c83] to-[#c836bd] bg-clip-text text-transparent">
              Global
            </span>
          </span>
          <span className="block bg-gradient-to-r from-[#d13cc1] to-[#a12be8] bg-clip-text text-transparent">
            Media Economy
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-[920px] text-sm leading-relaxed text-[#d4c8d7] sm:text-base">
          {hero.description}
        </p>
      </FadeIn>
      <AudienceStrip
        size="large"
        className="mx-auto mt-[clamp(90px,10.5vw,155px)] max-w-[1500px] px-4 pb-[clamp(70px,7vw,100px)]"
      />
    </section>
  );
}

function ClearBoundaries() {
  const { boundaries } = aboutPageContent;

  return (
    <ScaleIn
      className="mx-auto flex min-h-[470px] max-w-[1360px] flex-col items-center justify-center rounded-[30px] border border-[#56445d] px-6 py-14 text-center"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(180,38,182,.75), transparent 55%), radial-gradient(ellipse at 20% 0%, rgba(228,81,81,.34), transparent 40%)",
      }}
    >
      <Eyebrow>{boundaries.eyebrow}</Eyebrow>
      <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight md:text-5xl xl:text-6xl">
        {boundaries.title}
      </h2>
      <div className="mt-6 h-[2px] w-48 bg-[#e446a8]" />
      <p className="mt-6 max-w-[760px] text-sm leading-relaxed font-semibold text-[#f1e8f1] sm:text-base">
        {boundaries.focus}
      </p>
      <p className="mt-6 max-w-[800px] text-sm leading-relaxed text-[#d5cad8] sm:text-base">
        {boundaries.enterprise}
      </p>
      <p className="mt-7 bg-gradient-to-r from-[#ee6480] to-[#ba2edb] bg-clip-text font-[family-name:var(--font-display)] text-2xl leading-tight italic text-transparent sm:text-3xl xl:text-4xl">
        {boundaries.closing}
      </p>
    </ScaleIn>
  );
}

function ResourcesSection() {
  const { resources } = aboutPageContent;

  return (
    <section id="resources" className="mx-auto mt-36 max-w-[1440px] px-5 sm:px-10">
      <FadeIn>
        <SectionHeading eyebrow={resources.eyebrow}>
          {resources.title[0]}<br />{resources.title[1]}
        </SectionHeading>
      </FadeIn>
      <FadeIn delay={0.1}>
        <AboutResources />
      </FadeIn>
    </section>
  );
}

function ContractAudit() {
  const { contract } = aboutPageContent;

  return (
    <section
      id="contract-audit"
      className="mx-auto mt-32 grid max-w-[1360px] gap-14 overflow-hidden rounded-[30px] border border-[#56445d] bg-[#080510] px-6 py-12 sm:px-10 lg:grid-cols-[1fr_0.92fr] lg:px-12 lg:py-14"
      style={{ backgroundImage: "radial-gradient(ellipse at 100% 100%, rgba(215,82,65,.75), transparent 40%)" }}
    >
      <FadeIn direction="left" className="rounded-[23px] bg-[#1d2028] px-7 py-8 sm:px-9">
        <Eyebrow>{contract.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight lg:text-5xl xl:text-6xl">
          {contract.title}
        </h2>
        <div className="mt-6 h-[2px] w-48 bg-[#e446a8]" />
        <dl className="mt-8">
          {tokenFacts.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-5 border-b border-white/25 py-5 text-sm text-[#dfd8e3] sm:text-base">
              <dt>{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>
      </FadeIn>
      <FadeIn direction="right" className="flex flex-col justify-center">
        <p className="text-sm font-semibold uppercase text-[#f0e9f0]">{contract.addressLabel}</p>
        <div className="mt-2 flex min-h-14 items-center gap-4 rounded-full border border-[#7e6a85] px-5 text-xs text-[#d7cadb] sm:text-sm">
          <FiCopy className="shrink-0 text-[#d94ab5]" aria-hidden="true" />
          <span className="border-l border-[#7e6a85] pl-4">{contract.addressPending}</span>
        </div>
        <div className="mt-8 flex items-center gap-5">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#ff9128] to-[#af2fe6] text-[#080511]">
            <FiShield size={32} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase text-[#f0e9f0]">{contract.auditLabel}</p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-4xl leading-tight lg:text-5xl">
              {contract.auditStatus}
            </h3>
          </div>
        </div>
        <p className="mt-7 max-w-[560px] text-sm leading-relaxed text-[#d8ccdb] sm:text-base">
          {contract.auditDescription}
        </p>
        <p className="mt-6 max-w-[560px] border-l-2 border-[#ae318b] pl-5 text-sm leading-[1.5] text-[#afa1b5] italic sm:text-base">
          {contract.auditNote}
        </p>
        <div className="mt-7 flex items-end gap-5">
          <div className="flex flex-col gap-3">
            <button type="button" disabled className="min-h-11 min-w-44 cursor-not-allowed rounded-full border border-[#7e6a85] px-5 text-xs text-[#c6b9ca] opacity-65">
              View on BscScan
            </button>
            <a
              href="https://www.avirvox.io/assets/Avirvox%20Audit-BXUT7G2-.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 min-w-44 items-center justify-center rounded-full border border-[#7e6a85] px-5 text-xs text-[#c6b9ca] transition-colors hover:border-[#e64ca8] hover:text-white"
            >
              View Audit Report
            </a>
          </div>
          <Image
            src="/assets/images/qr-code.png"
            alt="Scan the QR code"
            width={112}
            height={112}
            className="size-28 rounded-xl"
          />
        </div>
      </FadeIn>
    </section>
  );
}

function LeadershipSection() {
  const { team } = aboutPageContent;

  return (
    <section id="team" className="mx-auto mt-36 max-w-[1360px] px-5 sm:px-10">
      <FadeIn>
        <SectionHeading eyebrow={team.eyebrow} description={team.description}>
          {team.title}
        </SectionHeading>
      </FadeIn>
      <StaggerGroup className="mx-auto mt-14 grid max-w-[1100px] gap-5 md:grid-cols-2">
        {leadershipTeam.map((person) => (
          <StaggerItem key={person.name}>
            <TiltCard className="group rounded-[23px]">
              <LeadershipCard person={person} />
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function QuestionsSection() {
  const { faq } = aboutPageContent;

  return (
    <section id="faq" className="mx-auto mt-36 max-w-[1020px] px-5 sm:px-10">
      <FadeIn>
        <SectionHeading eyebrow={faq.eyebrow}>{faq.title}</SectionHeading>
      </FadeIn>
      <StaggerGroup className="mt-14 space-y-4">
        {aboutQuestions.map(({ question, answer }, index) => (
          <StaggerItem key={question}>
            <details open={index === 0} className="group rounded-[23px] border border-[#57475f] bg-[#090511] px-7 py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base text-[#f2e8f3] marker:hidden sm:text-lg">
                <span>{question}</span>
                <span className="text-3xl leading-none text-[#e246aa] group-open:hidden" aria-hidden="true">+</span>
                <span className="hidden text-3xl leading-none text-[#e246aa] group-open:block" aria-hidden="true">−</span>
              </summary>
              <p className="mt-5 max-w-[820px] text-sm leading-[1.5] text-[#bfb2c4] sm:text-base">
                {answer}
              </p>
            </details>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function ContactSection() {
  const { contact } = aboutPageContent;

  return (
    <section id="contact" className="mx-auto mt-36 max-w-[1360px] px-5 sm:px-10">
      <FadeIn>
        <SectionHeading eyebrow={contact.eyebrow} description={contact.description}>
          {contact.title[0]}<br />{contact.title[1]}
        </SectionHeading>
      </FadeIn>
      <FadeIn delay={0.1}>
        <AboutContactForm />
      </FadeIn>
    </section>
  );
}

function OfficialChannels() {
  const { channels } = aboutPageContent;

  return (
    <section id="official-channels" className="mx-auto mt-36 max-w-[1160px] px-5 pb-28 sm:px-10">
      <FadeIn>
        <SectionHeading eyebrow={channels.eyebrow} description={channels.description}>
          {channels.title[0]}<br />{channels.title[1]}
        </SectionHeading>
      </FadeIn>
      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2">
        {officialChannels.map((channel) => (
          <StaggerItem key={channel.label}>
            <TiltCard className="group rounded-[23px]">
              <ChannelCard channel={channel} />
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

export function AboutPageContent() {
  return (
    <main className="particle-page">
      <PageParticles />
      <AboutHero />
      <div className="px-4 sm:px-6 lg:px-10">
        <ClearBoundaries />
      </div>
      <ResourcesSection />
      <div className="px-4 sm:px-6 lg:px-10">
        <ContractAudit />
      </div>
      <LeadershipSection />
      <QuestionsSection />
      <ContactSection />
      <OfficialChannels />
    </main>
  );
}
