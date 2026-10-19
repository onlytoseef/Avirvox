import { ExecutionAllocationCard, ExecutionIntroCard } from "@/components/cards/execution-cards";

export function Execution() {
  return (
    <section className="mx-auto grid w-full max-w-[1344px] gap-3 px-4 py-6 md:grid-cols-2 md:gap-[22px] md:px-6">
      <ExecutionIntroCard />
      <ExecutionAllocationCard />
    </section>
  );
}
