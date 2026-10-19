import { Eyebrow, GradientButton } from "@/components/ui/elements";
import { executionAllocations, executionContent } from "@/lib/content/execution";

export function ExecutionIntroCard() {
  return (
    <div
      className="flex flex-col rounded-[28px] border border-[#3b2a45] bg-[#07050f] px-7 pb-10 pt-12 md:aspect-square md:rounded-[32px] md:px-[clamp(32px,4.2vw,60px)] md:pb-0 md:pt-[clamp(48px,6.1vw,88px)]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 85% 55% at 8% 0%, #a8409a 0%, #6a1d6a 38%, rgba(7,5,15,0) 100%)",
      }}
    >
      <Eyebrow className="self-start">{executionContent.eyebrow}</Eyebrow>

      <h2 className="mt-[clamp(14px,1.6vw,24px)] font-[family-name:var(--font-display)] text-[clamp(38px,4.3vw,62px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f6eaf4]">
        {executionContent.title[0]}
        <br />
        {executionContent.title[1]}
      </h2>

      <div className="mt-[clamp(14px,1.5vw,22px)] h-[2px] w-[clamp(120px,13vw,190px)] bg-gradient-to-r from-[#ec468d] to-[#a026dd]/30" />

      <p className="mt-[clamp(14px,1.5vw,22px)] max-w-[440px] text-[clamp(14px,1.25vw,18px)] leading-[1.5] text-[#d9cfe0]">
        {executionContent.description}
      </p>

      <div className="mt-[clamp(28px,4.5vw,65px)]">
        <GradientButton
          href="#roadmap"
          size="sm"
          className="min-h-[44px] px-8 text-sm md:min-h-[clamp(44px,3.8vw,55px)] md:px-[clamp(28px,3.2vw,46px)]"
        >
          {executionContent.actionLabel}
        </GradientButton>
      </div>
    </div>
  );
}

export function ExecutionAllocationCard() {
  return (
    <div
      className="flex flex-col justify-between gap-5 overflow-hidden rounded-[28px] border border-[#3b2a45] bg-[#07050f] py-8 md:aspect-square md:gap-0 md:rounded-[32px] md:py-[clamp(24px,2.5vw,36px)]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 95% 85% at 100% 100%, #d9605a 0%, rgba(150,45,75,0.55) 35%, rgba(7,5,15,0) 72%)",
      }}
    >
      {executionAllocations.map(({ lines, percent, left }) => (
        <div
          key={lines.join(" ")}
          className="relative h-[clamp(40px,3.8vw,55px)]"
        >
          <span className="absolute left-[6%] top-1/2 -translate-y-1/2 text-[clamp(13px,1.53vw,22px)] font-light leading-[1.2] text-[#f2eaf3]">
            {lines.map((line, i) => (
              <span key={i} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </span>

          <div
            className="absolute top-0 flex h-full w-full items-center rounded-full border border-[#8a7a90]/60 bg-[#0a0710]/70 pl-[clamp(4px,0.5vw,7px)]"
            style={{ left: `${left}%` }}
          >
            <div className="flex h-[clamp(28px,2.8vw,40px)] w-[clamp(46px,4.45vw,64px)] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#fd9a2a] via-[#ee4a8a] to-[#b02fd8] text-[clamp(10px,0.95vw,14px)] font-medium text-white shadow-[0_0_14px_rgba(230,76,150,0.4)]">
              {String(percent).padStart(2, "0")}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
