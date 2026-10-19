import { AudienceStrip } from "@/components/ui/audience-strip";
import { VestingScheduleCard } from "@/components/cards/vesting-schedule-card";
import { Eyebrow } from "@/components/ui/elements";
import { SaleRoundsChart, SupplyDonut } from "@/components/charts/avx-charts";
import {
  avxPageContent,
  fixedSupplyDetails,
  tgeCountdown,
  tokenReleaseDetails,
  vestingSchedules,
} from "@/lib/content/avx-page";

function SectionHeading({
  eyebrow,
  title,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  compact?: boolean;
}) {
  return (
    <div className="text-center">
      <Eyebrow className={compact ? "px-3 py-1 text-[10px]" : "px-4 py-1 text-[clamp(9px,0.95vw,14px)]"}>
        {eyebrow}
      </Eyebrow>
      <h2 className={`${compact ? "avx-page-compact-title" : "mt-5 text-[clamp(2.6rem,4.5vw,4.2rem)]"} font-[family-name:var(--font-display)] leading-[0.98] font-normal tracking-[-0.045em] text-[#f6edf5]`}>
        {title}
      </h2>
      <div className={compact ? "avx-page-compact-underline" : "mx-auto mt-6 h-[2px] w-48 bg-[#e446a8]"} />
    </div>
  );
}

function AvxHero() {
  return (
    <section className="relative isolate -mt-[97px] min-h-[700px] overflow-hidden text-center md:min-h-[800px] lg:min-h-[925px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_at_50%_0%,#a23d7777,transparent_61%),radial-gradient(ellipse_at_22%_0%,#d46b3a44,transparent_43%)]" />
      <div className="mx-auto min-w-0 max-w-[1440px] px-5 pt-[calc(clamp(100px,13vw,190px)+97px)]">
        <Eyebrow>{avxPageContent.eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-full font-[family-name:var(--font-display)] text-[clamp(2.2rem,8.1vw,8rem)] leading-[0.93] font-normal tracking-[-0.045em] uppercase">
          <span className="block text-[#f3e8f2]">{avxPageContent.title[0]}</span>
          <span className="block bg-gradient-to-r from-[#e352b0] via-[#c638c5] to-[#9231dd] bg-clip-text text-transparent">
            {avxPageContent.title[1]}
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-[760px] text-sm leading-[1.5] text-[#d4c8d7] sm:text-base">
          {avxPageContent.description}
        </p>
      </div>
      <AudienceStrip
        size="large"
        className="mx-auto mt-[clamp(90px,10.5vw,155px)] max-w-[1500px] px-4 pb-[clamp(80px,7.3vw,105px)]"
      />
    </section>
  );
}

function TokenOverview() {
  return (
    <section
      className="avx-page-overview-card mx-auto max-w-[1360px] rounded-[30px] border border-[#514057]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 51% 0%, rgba(181,35,180,.8), transparent 56%)",
      }}
    >
      <SectionHeading eyebrow={avxPageContent.supplyEyebrow} title={avxPageContent.supplyTitle} compact />
      <div className="avx-page-overview-grid">
        <SupplyDonut />
        <dl className="avx-page-overview-details">
          {fixedSupplyDetails.map(({ label, value, detail }) => (
            <div
              key={label}
              className="avx-page-overview-row"
            >
              <dt className="max-w-[45%]">{label}</dt>
              <dd className="text-right">
                <span className="block">{value}</span>
                {detail && <span className="block">{detail}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function SaleStructure() {
  return (
    <section className="mx-auto mt-[clamp(110px,10vw,150px)] max-w-[1360px]">
      <SectionHeading eyebrow={avxPageContent.saleEyebrow} title={avxPageContent.saleTitle} />
      <div className="mt-0">
        <SaleRoundsChart />
      </div>
      <p className="mt-8 text-center text-sm text-[#e7dce7] sm:text-base">
        {avxPageContent.saleCaption}
      </p>
    </section>
  );
}

function TokenReleaseSummary() {
  return (
    <div className="rounded-[22px] bg-[#1c1f27] px-6 py-8 sm:px-9">
      <p className="bg-gradient-to-r from-[#ff8e29] to-[#b733d7] bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
        TGE IN
      </p>
      <div className="mt-4 grid grid-cols-4 rounded-[22px] border border-[#ac3abb] px-2 py-4 text-center">
        {tgeCountdown.map(([value, label], index) => (
          <div key={label} className={index > 0 ? "border-l border-white/40" : ""}>
            <strong className="block text-[clamp(1.4rem,3vw,3rem)] leading-none">{value}</strong>
            <span className="block text-xs font-medium sm:text-base">{label}</span>
          </div>
        ))}
      </div>
      <dl className="mt-5">
        {tokenReleaseDetails.map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4 border-b border-white/30 py-5 text-sm text-[#ddd8e0] sm:text-base">
            <dt>{label}</dt>
            <dd className="text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FounderAllocation() {
  return (
    <div className="flex min-w-0 flex-col justify-center">
      <p className="text-lg uppercase text-[#e0d5e1] sm:text-2xl">{avxPageContent.founderTitle}</p>
      <p className="mt-2 flex items-end gap-3">
        <strong className="bg-gradient-to-r from-[#e843b3] to-[#9635df] bg-clip-text text-[clamp(3.5rem,5.5vw,5.5rem)] leading-none text-transparent">0%</strong>
        <span className="pb-2 text-sm text-[#ded4e0] sm:text-xl">At TGE</span>
      </p>
      <div className="mt-14 grid grid-cols-[1fr_2fr] gap-3">
        <div className="relative h-5 rounded-full border border-[#b939ab]">
          <span className="absolute top-1/2 left-0 size-12 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#ff9127] to-[#ab31dc] shadow-[0_0_35px_#9831df]" />
        </div>
        <div className="h-5 rounded-full border border-[#b939ab]" />
      </div>
      <div className="mt-8 grid grid-cols-[1fr_2fr] gap-3 text-xs text-[#e6dce7] sm:text-lg">
        <span>TGE</span>
        <span className="flex justify-between gap-3"><span>Month 12 · Cliff Ends</span><span>Month 48</span></span>
      </div>
      <p className="mt-14 rounded-[20px] bg-[#23062d] px-7 py-6 text-sm leading-[1.4] text-[#afa1b5] sm:text-xl">
        {avxPageContent.founderDescription}
      </p>
    </div>
  );
}

function VestingSchedule() {
  return (
    <section
      className="mt-10 rounded-[26px] border border-[#52415b] px-6 py-10 sm:px-8"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 99% 0%, rgba(198,68,136,.58), transparent 43%), radial-gradient(ellipse at 0% 100%, rgba(196,60,140,.62), transparent 48%)",
      }}
    >
      <h3 className="inline-flex rounded-full border border-[#b63aa8] px-5 py-2 text-sm uppercase text-[#e4d7e5] sm:text-lg">
        {avxPageContent.vestingTitle}
      </h3>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {vestingSchedules.map((schedule) => (
          <VestingScheduleCard key={schedule.name} schedule={schedule} />
        ))}
      </div>
    </section>
  );
}

function TokenRelease() {
  return (
    <section className="mx-auto mt-[clamp(80px,7vw,100px)] max-w-[1360px]">
      <SectionHeading eyebrow={avxPageContent.releaseEyebrow} title={avxPageContent.releaseTitle} />
      <div
        className="mt-14 grid gap-10 rounded-[26px] border border-[#52415b] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.15fr] lg:gap-9"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 98% 0%, rgba(192,66,137,.56), transparent 40%), radial-gradient(ellipse at 0% 100%, rgba(199,69,157,.65), transparent 37%)",
        }}
      >
        <TokenReleaseSummary />
        <FounderAllocation />
      </div>
      <VestingSchedule />
    </section>
  );
}

function EnterpriseBoundary() {
  return (
    <section
      className="mx-auto mt-10 max-w-[1360px] rounded-[30px] border border-[#52415b] px-6 py-14 text-center sm:px-12 lg:py-14"
      style={{ backgroundImage: "radial-gradient(ellipse at 100% 100%, rgba(214,84,66,.7), transparent 42%)" }}
    >
      <Eyebrow className="px-4 py-1 text-[clamp(9px,0.95vw,14px)]">{avxPageContent.boundaryEyebrow}</Eyebrow>
      <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] tracking-[-0.04em]">
        {avxPageContent.boundaryTitle[0]}<br />{avxPageContent.boundaryTitle[1]}
      </h2>
      <div className="mx-auto mt-7 h-[2px] w-48 bg-[#e446a8]" />
      <div className="mx-auto mt-8 max-w-[1200px] space-y-6 text-sm leading-[1.55] text-[#e7dbe8] sm:text-lg">
        {avxPageContent.boundaryParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}

export function AvxPageContent() {
  return (
    <main>
      <AvxHero />
      <div className="px-4 sm:px-6 lg:px-10">
        <TokenOverview />
        <SaleStructure />
        <TokenRelease />
        <EnterpriseBoundary />
      </div>
    </main>
  );
}
