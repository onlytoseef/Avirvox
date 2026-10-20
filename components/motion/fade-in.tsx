"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type FadeInProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Pixels to travel from on entry. */
  distance?: number;
  /** Direction to travel in from. */
  direction?: "up" | "down" | "left" | "right";
};

export function FadeIn({
  delay = 0,
  distance = 24,
  direction = "up",
  children,
  ...props
}: FadeInProps) {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "down" || direction === "right" ? 1 : -1;

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: distance * sign }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
