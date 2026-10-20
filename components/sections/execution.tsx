import { ExecutionAllocationCard, ExecutionIntroCard } from "@/components/cards/execution-cards";
import { HoverLift } from "@/components/motion/hover-lift";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export function Execution() {
  return (
    <section className="mx-auto w-full max-w-[1344px] px-4 py-6 md:px-6">
      <StaggerGroup className="grid gap-3 md:grid-cols-2 md:gap-[22px]">
        <StaggerItem>
          <HoverLift>
            <ExecutionIntroCard />
          </HoverLift>
        </StaggerItem>
        <StaggerItem>
          <HoverLift>
            <ExecutionAllocationCard />
          </HoverLift>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
