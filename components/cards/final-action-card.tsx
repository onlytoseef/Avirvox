import { Eyebrow, GradientButton, OutlineButton } from "@/components/ui/elements";
import { participationCard, resourcesCard } from "@/lib/content/final-cards";

type FinalCardContent = typeof participationCard | typeof resourcesCard;

export function FinalActionCard({
  card,
  resources = false,
}: {
  card: FinalCardContent;
  resources?: boolean;
}) {
  return (
    <article
      id={resources ? "resources" : undefined}
      className={`flex min-h-[400px] flex-col justify-center rounded-[28px] border border-[#5d3b59] p-7 sm:p-10 lg:min-h-[450px] xl:p-11 ${
        resources
          ? "bg-[radial-gradient(ellipse_at_100%_100%,#d7584c88,transparent_60%)]"
          : "bg-[radial-gradient(ellipse_at_0%_0%,#bd438288,transparent_62%)]"
      }`}
    >
      <div>
        <Eyebrow className="text-xs">{card.eyebrow}</Eyebrow>
      </div>
      <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight lg:text-5xl">
        {card.title[0]}
        <br />
        {card.title[1]}
      </h2>
      <div className="mt-5 h-px w-24 bg-rose" />
      <p className="mt-4 max-w-[470px] text-[15px] leading-[1.5] text-muted sm:text-base">
        {card.description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <GradientButton
          href={card.primaryHref}
          className="min-h-[44px] min-w-[155px] px-5 text-xs"
        >
          {card.primaryLabel}
        </GradientButton>
        <OutlineButton
          href={card.secondaryHref}
          className="min-h-[44px] min-w-[155px] px-5 text-xs"
        >
          {card.secondaryLabel}
        </OutlineButton>
      </div>
    </article>
  );
}
