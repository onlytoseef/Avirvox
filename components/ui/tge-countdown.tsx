"use client";

import { useEffect, useState } from "react";

const tgeDate = Date.UTC(2027, 2, 15);
const labels = ["Days", "Hours", "Mins", "Sec"] as const;

function getTimeRemaining() {
  const seconds = Math.max(0, Math.floor((tgeDate - Date.now()) / 1000));
  return [
    Math.floor(seconds / 86400),
    Math.floor((seconds % 86400) / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ];
}

export function TgeCountdown() {
  const [remaining, setRemaining] = useState<number[] | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getTimeRemaining());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="mt-4 grid grid-cols-4 rounded-[22px] border border-[#ac3abb] px-2 py-4 text-center"
      role="timer"
      aria-label="Time until TGE on 15 March 2027 at 00:00 UTC"
      aria-live="off"
    >
      {labels.map((label, index) => (
        <div key={label} className={index > 0 ? "border-l border-white/40" : ""}>
          <strong className="block text-2xl leading-none sm:text-3xl lg:text-4xl">
            {remaining ? String(remaining[index]).padStart(2, "0") : "--"}
          </strong>
          <span className="block text-xs font-medium sm:text-base">{label}</span>
        </div>
      ))}
    </div>
  );
}
