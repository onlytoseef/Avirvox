"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const BAND_HEIGHT = 680;
const STARS_PER_BAND = 18;
const BUBBLES_PER_BAND = 3;

function fraction(seed: number) {
  const value = Math.sin(seed * 127.1 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function PageParticles() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [bandCount, setBandCount] = useState(8);

  useEffect(() => {
    const layer = layerRef.current;
    const page = layer?.parentElement;
    if (!layer || !page) return;

    const resizeObserver = new ResizeObserver(() => {
      const nextCount = Math.min(36, Math.max(2, Math.ceil(page.scrollHeight / BAND_HEIGHT)));
      setBandCount((current) => (current === nextCount ? current : nextCount));
    });
    resizeObserver.observe(page);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return () => resizeObserver.disconnect();

    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.min(window.scrollY * 0.1, 480);
      layer.style.setProperty("--star-shift-slow", `${-distance * 0.45}px`);
      layer.style.setProperty("--star-shift-medium", `${-distance * 0.75}px`);
      layer.style.setProperty("--star-shift-fast", `${-distance}px`);
      layer.style.setProperty("--bubble-scroll-shift", `${-distance * 0.6}px`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const particles = useMemo(() => {
    const stars = Array.from({ length: bandCount * STARS_PER_BAND }, (_, index) => {
      const band = Math.floor(index / STARS_PER_BAND);
      const point = index % STARS_PER_BAND;
      return {
        left: `${3 + fraction(index + 1) * 94}%`,
        top: band * BAND_HEIGHT + 30 + fraction(index + 303) * (BAND_HEIGHT - 60),
        size: point % 9 === 0 ? 4 : point % 3 === 0 ? 3 : 2,
        duration: `${11 + fraction(index + 901) * 10}s`,
        delay: `${-fraction(index + 1301) * 21}s`,
        tone: point % 11 === 0 ? "amber" : point % 4 === 0 ? "rose" : "violet",
      };
    });
    const bubbles = Array.from({ length: bandCount * BUBBLES_PER_BAND }, (_, index) => {
      const band = Math.floor(index / BUBBLES_PER_BAND);
      return {
        left: `${6 + fraction(index + 2101) * 88}%`,
        top: band * BAND_HEIGHT + 80 + fraction(index + 2401) * (BAND_HEIGHT - 160),
        size: 8 + Math.round(fraction(index + 2701) * 8),
        duration: `${15 + fraction(index + 3001) * 8}s`,
        delay: `${-fraction(index + 3301) * 23}s`,
        tone: ["amber", "rose", "violet"][index % 3],
      };
    });
    return { stars, bubbles };
  }, [bandCount]);

  return (
    <div ref={layerRef} className="page-particles" aria-hidden="true">
      {["8%", "48%", "87%"].map((top, index) => (
        <span
          key={top}
          className={`home-orbit ${index % 2 ? "home-orbit-amber" : ""}`}
          style={{ top, left: `${48 + (index % 2) * 5}%`, width: `min(${80 + index * 4}vw, 1050px)` }}
        />
      ))}
      {particles.stars.map((star, index) => (
        <span
          key={index}
          className={`home-star-track home-star-track-${index % 3}`}
          style={{ left: star.left, top: star.top }}
        >
          <span
            className={`home-granule home-granule-${star.tone}`}
            style={{
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        </span>
      ))}
      {particles.bubbles.map((bubble, index) => (
        <span
          key={index}
          className="home-bubble-track"
          style={{ left: bubble.left, top: bubble.top }}
        >
          <span
            className={`home-bubble home-bubble-${bubble.tone}`}
            style={{
              width: bubble.size,
              height: bubble.size,
              animationDelay: bubble.delay,
              animationDuration: bubble.duration,
            }}
          />
        </span>
      ))}
    </div>
  );
}
