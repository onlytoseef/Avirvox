import type { CSSProperties } from "react";
import { avxChart, avxContent, avxSegments } from "@/lib/content/avx";

const { radius: R, stroke: STROKE, gap: GAP, startAngle: START_ANGLE } = avxChart;
const CIRCUMFERENCE = 2 * Math.PI * R;

const chartSegments = avxSegments.map((segment, index) => ({
  ...segment,
  offset: avxSegments
    .slice(0, index)
    .reduce((sum, s) => sum + s.percent, 0),
}));

export function DonutChart({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 300 300"
      role="img"
      aria-label={avxContent.chartLabel}
      className={className}
      style={style}
    >
      <defs>
        <radialGradient id="avx-hole" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5a2150" />
          <stop offset="100%" stopColor="#3a1536" />
        </radialGradient>
      </defs>
      <g transform={`rotate(${START_ANGLE - 90} 150 150)`}>
      {chartSegments.map(({ text, percent, color, offset }) => {
        const length = (percent / 100) * CIRCUMFERENCE;
        return (
          <circle
            key={text}
            cx="150"
            cy="150"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeDasharray={`${length - GAP} ${CIRCUMFERENCE - length + GAP}`}
            strokeDashoffset={-(offset / 100) * CIRCUMFERENCE}
          />
        );
      })}
      </g>
      <circle cx="150" cy="150" r={R - STROKE / 2} fill="url(#avx-hole)" />
    </svg>
  );
}

