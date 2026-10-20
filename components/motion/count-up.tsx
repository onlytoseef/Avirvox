"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "motion/react";

type CountUpProps = {
  /** Target numeric value to count up to. */
  value: number;
  /** Text shown before the number, e.g. "$". */
  prefix?: string;
  /** Text shown after the number, e.g. "%", "M". */
  suffix?: string;
  /** Decimal places to keep. */
  decimals?: number;
  duration?: number;
  className?: string;
};

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    `${prefix}${latest.toFixed(decimals)}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, value, duration, motionValue]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
