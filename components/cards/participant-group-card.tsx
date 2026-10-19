import { FiAward, FiCamera, FiCode, FiHeart, FiUsers } from "react-icons/fi";
import { participantGroups } from "@/lib/content/ecosystem-page";

type ParticipantGroup = (typeof participantGroups)[number];

const participantIcons = {
  creators: FiCamera,
  contributors: FiHeart,
  developers: FiCode,
  partners: FiUsers,
  communities: FiUsers,
  strategic: FiAward,
};

export function ParticipantGroupCard({ group }: { group: ParticipantGroup }) {
  const Icon = participantIcons[group.id];

  return (
    <article className="flex min-h-[296px] flex-col justify-between rounded-[30px] border border-[#514157] bg-[#090511] p-7">
      <span className="grid size-14 place-items-center rounded-[18px] border-2 border-[#c02cdf] bg-[linear-gradient(#090511,#090511)_padding-box,linear-gradient(#ff8d23,#ad2fe7)_border-box] text-[#ee6a52]">
        <Icon size={27} aria-hidden="true" />
      </span>
      <div>
        <h3 className="max-w-[280px] text-[clamp(1.5rem,2.25vw,2rem)] leading-[1.08] font-semibold text-white">
          {group.title}
        </h3>
        <p className="mt-4 text-xs leading-[1.4] text-[#e7dce8] sm:text-sm">
          {group.description}
        </p>
      </div>
    </article>
  );
}
