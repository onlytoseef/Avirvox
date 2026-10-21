import { vestingSchedules } from "@/lib/content/avx-page";

type VestingSchedule = (typeof vestingSchedules)[number];

export function VestingScheduleCard({ schedule }: { schedule: VestingSchedule }) {
  return (
    <article className="rounded-[30px] border border-[#52415b] bg-[#090511] px-5 py-8 sm:px-7">
      <h4 className="text-base font-semibold uppercase sm:text-lg">{schedule.name}</h4>
      <p className="mt-7 inline-block rounded-full bg-[#230630] px-4 py-2 text-sm text-[#b9aabe] sm:text-base">
        {schedule.dates}
      </p>
      <div className="mt-5 grid grid-cols-3 rounded-[20px] border border-[#89768e] px-2 py-4 text-center">
        <div>
          <strong className="block bg-gradient-to-r from-[#ff8426] to-[#e2457d] bg-clip-text text-2xl leading-none text-transparent sm:text-3xl">{schedule.atTge}</strong>
          <span className="text-xs uppercase sm:text-sm">At TGE</span>
        </div>
        <div className="border-x border-white/35 px-1">
          <strong className="block bg-gradient-to-r from-[#ff8426] to-[#e2457d] bg-clip-text text-2xl leading-none text-transparent sm:text-3xl">{schedule.cliffValue}</strong>
          <span className="text-xs uppercase sm:text-sm">{schedule.cliffLabel}</span>
        </div>
        <div>
          <strong className="block bg-gradient-to-r from-[#ff8426] to-[#e2457d] bg-clip-text text-2xl leading-none text-transparent sm:text-3xl">{schedule.remaining}</strong>
          <span className="text-xs uppercase sm:text-sm">{schedule.duration}</span>
        </div>
      </div>
      <p className="mt-6 text-sm leading-[1.5] text-[#e9deea] sm:text-base">{schedule.description}</p>
    </article>
  );
}
