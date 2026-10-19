import Image from "next/image";
import { Eyebrow } from "@/components/ui/elements";
import { leadershipTeam } from "@/lib/content/about-page";

type Leader = (typeof leadershipTeam)[number];

export function LeadershipCard({ person }: { person: Leader }) {
  return (
    <article className="about-page-team-card relative flex aspect-square min-h-[390px] flex-col justify-end overflow-hidden rounded-[24px] border border-[#55445a] p-8 sm:p-9">
      <Image
        src={person.image}
        alt={person.name}
        fill
        sizes="(max-width: 767px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="relative z-10">
        <Eyebrow className="max-w-full text-[10px]">{person.role}</Eyebrow>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.8rem,4.4vw,4.5rem)] leading-[0.98] tracking-[-0.045em]">
          {person.name}
        </h3>
        <div className="mt-5 h-[2px] w-48 bg-[#e446a8]" />
        <p className="mt-5 max-w-[560px] text-sm leading-[1.5] text-[#e0d4e2] sm:text-lg">
          {person.description}
        </p>
      </div>
    </article>
  );
}
