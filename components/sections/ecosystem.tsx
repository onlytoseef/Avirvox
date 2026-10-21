import Image from "next/image";
import { Heading, OutlineButton } from "@/components/ui/elements";
import {
  architectureLabels,
  ecosystemContent,
  ecosystemRelationships,
} from "@/lib/content/ecosystem";
import { FadeIn } from "@/components/motion/fade-in";
import { HoverLift } from "@/components/motion/hover-lift";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

function ArchitectureIcon({ name }: { name: (typeof architectureLabels)[number]["icon"] }) {
  if (name === "relationship") {
    return (
      <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
        <circle cx="7" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="13.5" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3.5 15c.3-2.2 1.5-3.4 3.5-3.4s3.2 1.2 3.5 3.4M12 12c2.4-.4 4.1.7 4.5 2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "participation") {
    return (
      <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
        <path d="M5 3.5h8.5L16 6v10.5H5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M13 3.5V6h3M8 9h5M8 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
      <rect x="3.5" y="4" width="13" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="m8 8-1.5 1.5L8 11m4-3 1.5 1.5L12 11M8.5 16h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative isolate mx-auto max-w-7xl px-5 pt-6 pb-8 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 40% 16% at 50% 29%, rgba(130,50,45,0.45) 0%, rgba(5,3,10,0) 100%), radial-gradient(ellipse 42% 12% at 46% 88%, rgba(150,35,140,0.5) 0%, rgba(5,3,10,0) 100%)",
        }}
      />
      <Heading
        eyebrow={ecosystemContent.eyebrow}
        titleClassName="!mt-3"
        description={ecosystemContent.description}
      >
        {ecosystemContent.title[0]}
        <br className="hidden sm:block" />
        {" "}{ecosystemContent.title[1]}
      </Heading>

      <StaggerGroup className="relative z-10 mx-auto mt-8 grid max-w-[730px] grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3 text-xs">
        {architectureLabels.map(({ label, icon, active }) => (
          <StaggerItem
            key={label}
            className={`flex min-h-[52px] items-center gap-2 rounded-[18px] border px-4 py-2.5 font-medium sm:px-4 ${
              active
                ? "border-transparent bg-gradient-to-b from-[#f28b20] via-[#d847a0] to-[#8c20e8] text-white shadow-[0_10px_30px_#a128ea26]"
                : "border-line bg-[#0c0812] text-white/90"
            }`}
          >
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-lg ${
                active
                  ? "bg-[#0c0812] text-white"
                  : "bg-gradient-to-b from-[#f28b20] via-[#d847a0] to-[#8c20e8] text-white"
              }`}
            >
              <ArchitectureIcon name={icon} />
            </span>
            <span className="leading-tight">{label}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeIn
        delay={0.1}
        className="relative mx-auto mt-0 grid max-w-[830px] items-center gap-8 rounded-[24px] border border-[#49364e] bg-[radial-gradient(ellipse_at_80%_45%,#49104b55,transparent_42%),#080610] px-6 pt-10 pb-8 sm:mt-[-25px] sm:grid-cols-[1.5fr_0.8fr] sm:gap-10 sm:px-12 sm:pt-[58px] sm:pb-9 md:min-h-[339px]"
      >
        <div>
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[#d8cbdc]">
            <span className="grid size-[30px] shrink-0 place-items-center rounded-[9px] bg-gradient-to-b from-[#f28b20] via-[#d847a0] to-[#8c20e8] text-white">
              <ArchitectureIcon name="architecture" />
            </span>
            {ecosystemContent.featureEyebrow}
          </div>
          <h3 className="mt-4 max-w-xl text-2xl leading-tight font-semibold tracking-tight md:text-3xl">
            {ecosystemContent.featureTitle[0]}
            <br className="hidden sm:block" />
            {" "}{ecosystemContent.featureTitle[1]}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {ecosystemContent.featureDescription}
          </p>
          <div className="mt-3">
            <OutlineButton href="#avx" size="sm">
              {ecosystemContent.exploreLabel} <span className="ml-2 text-[#ec4fae]">→</span>
            </OutlineButton>
          </div>
        </div>
        <Image
          src="/assets/images/graph.png"
          alt="AVX utility connecting eight nodes in the Avirox Labs ecosystem"
          width={313}
          height={313}
          className="mx-auto h-auto w-full max-w-[224px] rounded-[24px] border border-[#65536b]"
        />
      </FadeIn>

      <StaggerGroup className="mx-auto mt-5 grid max-w-[830px] gap-2.5 text-center text-xs sm:grid-cols-3 sm:gap-5">
        {ecosystemRelationships.map(([title, description]) => (
          <StaggerItem key={title}>
            <HoverLift className="flex min-h-[56px] flex-col justify-center rounded-[22px] border border-line bg-[#080610] px-3 py-2">
              <b className="font-medium">{title}</b>
              <span className="text-[11px] leading-tight text-muted">{description}</span>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
