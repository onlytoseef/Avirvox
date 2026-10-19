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

  return (
    <div
      className={`flex items-center ${
        isCompact
          ? "flex-nowrap justify-start gap-x-2 overflow-hidden"
          : `flex-wrap justify-center gap-y-3 ${isLarge ? "gap-x-4 lg:justify-between" : "gap-x-3"}`
      } ${className}`}
    >
      {heroAudiences.map((name, index) => (
        <div
          key={`${name}-${index}`}
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
            className={`${
              isCompact ? "size-1" : isLarge ? "size-2" : "size-1.5"
            } rounded-full bg-[#e83de4] shadow-[0_0_10px_#e83de4]`}
          />
        </div>
      ))}
    </div>
  );
}
