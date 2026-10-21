import Image from "next/image";
import { Eyebrow } from "@/components/ui/elements";
import { leadershipTeam } from "@/lib/content/about-page";

type Leader = (typeof leadershipTeam)[number];

export function LeadershipCard({ person }: { person: Leader }) {
  return (
    <article className="about-page-team-card relative flex aspect-[4/3] min-h-[320px] flex-col justify-end overflow-hidden rounded-[24px] border border-[#55445a] p-6 sm:p-8 md:aspect-square">
      <Image
        src={person.image}
        alt={person.name}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 550px"
        className="object-cover"
      />
      <div className="relative z-10">
        <Eyebrow className="max-w-full text-xs">{person.role}</Eyebrow>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight sm:text-4xl xl:text-5xl">
          {person.name}
        </h3>
        <div className="mt-5 h-[2px] w-48 bg-[#e446a8]" />
        <p className="mt-5 max-w-[560px] text-sm leading-relaxed text-[#e0d4e2] sm:text-base">
          {person.description}
        </p>
      </div>
    </article>
  );
}
