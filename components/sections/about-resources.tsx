"use client";

import { useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { ResourceCard } from "@/components/cards/resource-card";
import { resourceCards } from "@/lib/content/about-page";

export function AboutResources() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  function updateProgress() {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setProgress(maxScroll > 0 ? track.scrollLeft / maxScroll : 0);
  }

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("article");
    track.scrollBy({ left: direction * (card?.offsetWidth ?? 350), behavior: "smooth" });
  }

  return (
    <>
      <div
        ref={trackRef}
        onScroll={updateProgress}
        className={`mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 about-page-resource-track`}
        aria-label="AVX resources"
      >
        {resourceCards.map((resource) => (
          <ResourceCard key={resource.title} resource={resource} />
        ))}
      </div>
      <div className="mt-8 flex items-center gap-5 rounded-full border border-[#76657c] px-3 py-2">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous resources"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-[#77657d] text-[#e858b3] hover:border-[#e858b3]"
        >
          <FiArrowLeft aria-hidden="true" />
        </button>
        <div className="h-0.5 flex-1 bg-[#594b60]">
          <div className="h-full bg-[#f2eaf4] transition-[width]" style={{ width: `${30 + progress * 70}%` }} />
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next resources"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-[#77657d] text-[#e858b3] hover:border-[#e858b3]"
        >
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
