"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";

type TiltCardProps = HTMLMotionProps<"div"> & {
  /** Max tilt rotation in degrees. */
  strength?: number;
  /** Whether to show the cursor-tracking glow halo. */
  glow?: boolean;
};

export function TiltCard({
  strength = 8,
  glow = true,
  children,
  style,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 18 });

  const rotateX = useTransform(springY, [0, 1], [strength, -strength]);
  const rotateY = useTransform(springX, [0, 1], [-strength, strength]);

  const glowX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(springY, [0, 1], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  }

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(236,70,168,0.28), transparent 60%)`,
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        position: "relative",
        ...style,
      }}
      {...props}
    >
      {glow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: glowBackground }}
        />
      )}
      {children as React.ReactNode}
    </motion.div>
  );
}
