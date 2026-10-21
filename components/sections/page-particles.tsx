"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const BAND_HEIGHT = 680;
const STARS_PER_BAND = 22;
const BUBBLES_PER_BAND = 4;

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
    let pointerX = 0;
    let pointerY = 0;
    const update = () => {
      frame = 0;
      const distance = window.scrollY * 0.12;
      layer.style.setProperty("--star-shift-slow", `${-distance * 0.35}px`);
      layer.style.setProperty("--star-shift-medium", `${-distance * 0.65}px`);
      layer.style.setProperty("--star-shift-fast", `${-distance}px`);
      layer.style.setProperty("--bubble-scroll-shift", `${-distance * 0.8}px`);
      layer.style.setProperty("--pointer-slow-x", `${pointerX * 8}px`);
      layer.style.setProperty("--pointer-slow-y", `${pointerY * 6}px`);
      layer.style.setProperty("--pointer-medium-x", `${pointerX * 16}px`);
      layer.style.setProperty("--pointer-medium-y", `${pointerY * 12}px`);
      layer.style.setProperty("--pointer-fast-x", `${pointerX * 26}px`);
      layer.style.setProperty("--pointer-fast-y", `${pointerY * 18}px`);
      layer.style.setProperty("--pointer-bubble-x", `${pointerX * 20}px`);
      layer.style.setProperty("--pointer-bubble-y", `${pointerY * 14}px`);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      scheduleUpdate();
    };
    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
      scheduleUpdate();
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
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
        duration: `${7 + fraction(index + 901) * 6}s`,
        delay: `${-fraction(index + 1301) * 13}s`,
        tone: point % 11 === 0 ? "amber" : point % 4 === 0 ? "rose" : "violet",
      };
    });
    const bubbles = Array.from({ length: bandCount * BUBBLES_PER_BAND }, (_, index) => {
      const band = Math.floor(index / BUBBLES_PER_BAND);
      return {
        left: `${6 + fraction(index + 2101) * 88}%`,
        top: band * BAND_HEIGHT + 80 + fraction(index + 2401) * (BAND_HEIGHT - 160),
        size: 8 + Math.round(fraction(index + 2701) * 8),
        duration: `${10 + fraction(index + 3001) * 6}s`,
        delay: `${-fraction(index + 3301) * 16}s`,
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
