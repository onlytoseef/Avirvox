import { FinalActionCard } from "@/components/cards/final-action-card";
import { participationCard, resourcesCard } from "@/lib/content/final-cards";

export function FinalCards() {
  return (
    <section
      id="participate"
      className="mx-auto grid max-w-[1276px] gap-5 px-5 py-12 lg:grid-cols-2 xl:px-0"
    >
      <FinalActionCard card={participationCard} />
      <FinalActionCard card={resourcesCard} resources />
    </section>
  );
}
