import { heroAudiences } from "@/lib/content/hero";

export function AudienceStrip({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "default" | "large" | "compact";
}) {
  const isLarge = size === "large";
  const isCompact = size === "compact";

  const items = (copy: number) =>
    heroAudiences.map((name, index) => (
        <div
          key={`${copy}-${name}-${index}`}
          className={`flex items-center ${
            isCompact ? "shrink-0 gap-2" : isLarge ? "gap-4" : "gap-3"
          }`}
        >
          <span
            className={`rounded-full border border-[#513057] bg-[#100a19] ${
              isCompact
                ? "px-2 py-1 text-[8px]"
                : isLarge
                  ? "px-5 py-2.5 text-[13px]"
                  : "px-4 py-2 text-[11px]"
            }`}
          >
            {name}
          </span>
          <span
            className={`audience-marquee-dot ${
              isCompact ? "size-1" : isLarge ? "size-2" : "size-1.5"
            } block shrink-0 rounded-full bg-[#e83de4] shadow-[0_0_10px_#e83de4]`}
            style={{ animationDelay: `${(index % 4) * -0.45}s` }}
            aria-hidden="true"
          />
        </div>
      ));

  return (
    <div className={`audience-strip ${className}`}>
      <div className="audience-marquee-track">
        <div className="audience-marquee-group">{items(0)}</div>
        <div className="audience-marquee-group" aria-hidden="true">{items(1)}</div>
      </div>
    </div>
  );
}
