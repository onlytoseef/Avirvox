"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  type BarShapeProps,
} from "recharts";
import { saleRounds } from "@/lib/content/avx-page";

type SaleRound = (typeof saleRounds)[number];

const supplySegments = [
  { name: "Maximum sale allocation", value: 30, color: "#ff9a22" },
  { name: "Other supply", value: 70, color: "#302542" },
];

export function SupplyDonut() {
  return (
    <div
      role="img"
      aria-label="One billion AVX total supply, with a maximum 30 percent sale allocation"
      className="avx-page-supply-donut"
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <PieChart>
          <Pie
            data={supplySegments}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="53%"
            outerRadius="97%"
            startAngle={90}
            endAngle={-270}
            stroke="#080510"
            strokeWidth={8}
            isAnimationActive={false}
          >
            {supplySegments.map((segment) => (
              <Cell key={segment.name} fill={segment.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="avx-page-donut-center" />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <strong className="avx-page-donut-value">1B</strong>
        <span className="avx-page-donut-label">Total Supply</span>
      </div>
    </div>
  );
}

const barBackgrounds: Record<SaleRound["gradient"], string> = {
  private: "linear-gradient(180deg, #ff971a 0%, #7a3d10 55%, #0b0610 100%)",
  roundOne: "linear-gradient(180deg, #a30592 0%, #55004f 57%, #0b0511 100%)",
  roundTwo: "linear-gradient(180deg, #345bd9 0%, #1b2c70 56%, #080611 100%)",
};

function SaleBar({ x, y, width, height, payload }: BarShapeProps) {
  const round = payload as SaleRound;

  return (
    <foreignObject x={x} y={y} width={width} height={height}>
      <div
        className="flex h-full flex-col justify-between rounded-[22px] border border-white/35 p-[clamp(20px,2.2vw,32px)] text-white"
        style={{ background: barBackgrounds[round.gradient] }}
      >
        <div>
          <p className="text-2xl leading-[1.05] font-medium">{round.name}</p>
          <p className="mt-1 text-[clamp(0.8rem,1.3vw,1.25rem)] text-white/80">{round.dates}</p>
        </div>
        <div>
          <p className="text-[clamp(0.8rem,1.3vw,1.25rem)] text-white/80">{round.amount}</p>
          <p className="mt-1 whitespace-nowrap">
            <span className="text-xl leading-none font-medium">{round.price}</span>
            <span className="ml-2 text-xl">/ AVX</span>
          </p>
        </div>
      </div>
    </foreignObject>
  );
}

export function SaleRoundsChart() {
  return (
    <>
      <div
        role="img"
        aria-label="AVX price rises from $0.015 in the private round to $0.020 in public round one and $0.030 in public round two"
        className="hidden h-[700px] w-full md:block"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart data={saleRounds} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barCategoryGap={20}>
            <XAxis dataKey="name" hide />
            <YAxis hide domain={[0, 104]} />
            <Bar dataKey="barHeight" shape={(props: BarShapeProps) => <SaleBar {...props} />} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-4 md:hidden">
        {saleRounds.map((round) => (
          <div
            key={round.name}
            className="flex min-h-64 flex-col justify-between rounded-[22px] border border-white/35 p-6"
            style={{ background: barBackgrounds[round.gradient] }}
          >
            <div>
              <p className="text-xl font-medium">{round.name}</p>
              <p className="text-sm text-white/80">{round.dates}</p>
            </div>
            <div>
              <p className="text-sm text-white/80">{round.amount}</p>
              <p className="text-[2rem] font-medium">{round.price} <span className="text-sm">/ AVX</span></p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
