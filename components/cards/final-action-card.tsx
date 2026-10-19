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
      className={`flex min-h-[440px] flex-col justify-center rounded-[28px] border border-[#5d3b59] p-8 sm:p-12 lg:min-h-[540px] xl:aspect-square xl:min-h-0 xl:p-14 ${
        resources
          ? "bg-[radial-gradient(ellipse_at_100%_100%,#d7584c88,transparent_60%)]"
          : "bg-[radial-gradient(ellipse_at_0%_0%,#bd438288,transparent_62%)]"
      }`}
    >
      <div>
        <Eyebrow className="text-xs">{card.eyebrow}</Eyebrow>
      </div>
      <h2
        className="mt-6 font-[family-name:var(--font-display)] leading-[0.96] tracking-[-0.04em]"
        style={{ fontSize: "clamp(3rem, 5vw, 4.75rem)" }}
      >
        {card.title[0]}
        <br />
        {card.title[1]}
      </h2>
      <div className="mt-6 h-px w-28 bg-rose" />
      <p className="mt-5 max-w-[470px] text-[18px] leading-[1.4] text-muted">
        {card.description}
      </p>
      <div className="mt-12 flex flex-wrap gap-3">
        <GradientButton
          href={card.primaryHref}
          className="min-h-[52px] min-w-[180px] text-[14px] xl:min-w-[200px] xl:text-[15px]"
        >
          {card.primaryLabel}
        </GradientButton>
        <OutlineButton
          href={card.secondaryHref}
          className="min-h-[52px] min-w-[180px] text-[14px] xl:min-w-[200px] xl:text-[15px]"
        >
          {card.secondaryLabel}
        </OutlineButton>
      </div>
    </article>
  );
}
