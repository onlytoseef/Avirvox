import { Eyebrow, GradientButton, OutlineButton } from "@/components/ui/elements";
import { participatePageContent } from "@/lib/content/participate-page";

export function SecurityCard() {
  const { security } = participatePageContent;

  return (
    <section
      id="verify"
      className="mx-auto mt-5 max-w-[1170px] overflow-hidden rounded-[30px] border border-[#504054] bg-[#090510] px-7 py-12 sm:px-12 lg:px-14"
      style={{ backgroundImage: "radial-gradient(ellipse at 100% 100%, rgba(213,83,67,.6), transparent 37%)" }}
    >
      <div className="grid gap-12 lg:grid-cols-[1.25fr_0.85fr] lg:gap-20">
        <div>
          <Eyebrow>{security.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.7rem,4.3vw,4.8rem)] leading-[0.96] tracking-[-0.04em]">
            {security.title}
          </h2>
          <div className="mt-5 h-px w-36 bg-[#d13b95]" />
          <p className="mt-5 max-w-[550px] text-sm leading-[1.5] text-[#c8bbcc] sm:text-base">
            {security.description}
          </p>
          <p className="mt-12 text-xs font-semibold uppercase text-[#e8dce8]">{security.contractLabel}</p>
          <div className="mt-3 inline-flex max-w-full items-center gap-3 rounded-full border border-[#695373] px-5 py-3 text-xs text-[#e8dce8]">
            <span className="text-[#cf36d5]">▣</span>
            <span>{security.contractPending}</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#e546a2]">{security.warningTitle}</h3>
          <ul className="mt-4">
            {security.warnings.map((warning) => (
              <li key={warning} className="flex items-center gap-3 border-b border-[#5f4b5f] py-4 text-sm font-medium text-[#eee5ef]">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#a831ad] text-xs text-[#120816]">×</span>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <GradientButton href="mailto:Coin@Avirox.io?subject=Official%20AVX%20contract" size="sm" className="min-w-44">Ask for Contract Address</GradientButton>
        <OutlineButton href="/#resources" size="sm" className="min-w-44">View Resources</OutlineButton>
        <OutlineButton href="mailto:Coin@Avirox.io?subject=AVX%20audit" size="sm" className="min-w-44">View Audit Report</OutlineButton>
      </div>
    </section>
  );
}

