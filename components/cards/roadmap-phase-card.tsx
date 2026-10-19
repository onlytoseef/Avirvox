import { Eyebrow } from "@/components/ui/elements";
import { RoadmapVisual } from "@/components/sections/roadmap-visual";
import { roadmapPagePhases } from "@/lib/content/roadmap-page";

type Phase = (typeof roadmapPagePhases)[number];

function PhaseCopy({ phase }: { phase: Phase }) {
  return (
    <div className="flex h-full min-w-0 flex-col justify-center px-7 py-10 sm:px-10 lg:px-8">
      <Eyebrow className="max-w-full self-start text-wrap text-[9px] sm:text-[10px]">
        {phase.eyebrow}
      </Eyebrow>
      <h2 id={`phase-${phase.number}`} className="mt-5 max-w-[590px] whitespace-pre-line break-words font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.5vw,5rem)] leading-[0.98] font-normal tracking-[-0.045em] text-[#f8ebf5]">
        {phase.title}
      </h2>
      <div className="mt-5 h-px w-32 bg-gradient-to-r from-[#ee4c9b] to-transparent" />

      {phase.description && (
        <p className="mt-5 max-w-[570px] text-sm leading-[1.5] text-[#d7cbd9] lg:text-base">
          {phase.description}
        </p>
      )}

      {phase.rounds && (
        <ul className="mt-5 max-w-[600px] border-t border-[#57465a]">
          {phase.rounds.map(({ name, dates }) => (
            <li
              key={name}
              className="flex flex-col gap-1 border-b border-[#57465a] py-3 text-sm text-[#f3eaf2] sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:text-base"
            >
              <span>•&nbsp; {name}</span>
              <span className="text-[#c5b8c9]">{dates}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function RoadmapPhaseCard({ phase }: { phase: Phase }) {
  const glow = phase.imageFirst
    ? "radial-gradient(ellipse at 96% 0%, rgba(207,74,128,0.54), transparent 49%)"
    : "radial-gradient(ellipse at 0% 100%, rgba(185,47,139,0.6), transparent 47%)";

  return (
    <article
      className="grid min-h-[470px] min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[25px] border border-[#514157] bg-[#080610] lg:grid-cols-2"
      style={{ backgroundImage: glow }}
      aria-labelledby={`phase-${phase.number}`}
    >
      <div className={`min-w-0 ${phase.imageFirst ? "lg:order-2" : ""}`}>
        <PhaseCopy phase={phase} />
      </div>
      <div
        className={`flex min-w-0 items-center p-5 sm:p-7 ${
          phase.imageFirst ? "lg:order-1 lg:pl-7 lg:pr-14" : "lg:pl-14 lg:pr-7"
        }`}
      >
        <RoadmapVisual kind={phase.visual} />
      </div>
    </article>
  );
}

