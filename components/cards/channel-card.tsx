import { FaInstagram, FaLinkedinIn, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { officialChannels } from "@/lib/content/about-page";

type Channel = (typeof officialChannels)[number];

const channelIcons = {
  LinkedIn: FaLinkedinIn,
  X: FaXTwitter,
  Telegram: FaTelegram,
  Instagram: FaInstagram,
};

export function ChannelCard({ channel }: { channel: Channel }) {
  const Icon = channelIcons[channel.label];

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Avirvox Labs on ${channel.label} (opens in a new tab)`}
      className="flex min-h-[170px] flex-col justify-between rounded-[24px] border border-[#56445d] bg-[#090511] p-7 transition-colors hover:border-[#e64ca8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-b from-[#fa9027] to-[#a82ee4] text-[#0c0612]">
        <Icon aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-base font-semibold text-white">{channel.label}</h3>
        <p className="text-sm text-[#c8bbcd]">Follow For Daily Updates</p>
      </div>
    </a>
  );
}
