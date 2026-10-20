"use client";

import { motion, type HTMLMotionProps } from "motion/react";

export function HoverLift({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
