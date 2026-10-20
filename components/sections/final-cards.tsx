import { FinalActionCard } from "@/components/cards/final-action-card";
import { participationCard, resourcesCard } from "@/lib/content/final-cards";
import { HoverLift } from "@/components/motion/hover-lift";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export function FinalCards() {
  return (
    <section
      id="participate"
      className="mx-auto max-w-[1276px] px-5 py-12 xl:px-0"
    >
      <StaggerGroup className="grid gap-5 lg:grid-cols-2">
        <StaggerItem>
          <HoverLift>
            <FinalActionCard card={participationCard} />
          </HoverLift>
        </StaggerItem>
        <StaggerItem>
          <HoverLift>
            <FinalActionCard card={resourcesCard} resources />
          </HoverLift>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
