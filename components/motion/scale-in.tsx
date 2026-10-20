"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type ScaleInProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function ScaleIn({ delay = 0, children, ...props }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
