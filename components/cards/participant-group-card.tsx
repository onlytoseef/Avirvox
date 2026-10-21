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
      <span className="ecosystem-participant-icon grid size-14 place-items-center rounded-[18px] text-[#ee6a52]">
        <Icon size={27} aria-hidden="true" />
      </span>
      <div>
        <h3 className="max-w-[280px] text-xl leading-tight font-semibold text-white lg:text-2xl">
          {group.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-[#e7dce8]">
          {group.description}
        </p>
      </div>
    </article>
  );
}
