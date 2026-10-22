export const roadmapPageContent = {
  eyebrow: "Roadmap",
  title: ["From Participation To", "Ecosystem Growth"],
  intro:
    "A phased roadmap for building the Avirox Labs ecosystem, activating AVX utility and expanding participation through measurable ecosystem activity.",
  milestone: {
    eyebrow: "Key Milestone | Scheduled",
    title: "TGE – 15 March 2027",
    phase: "Phase 03 · TGE & First Claims",
    description:
      "Enable the planned token generation event and first eligible AVX claims through the official participant dashboard, subject to readiness.",
  },
  disclaimer:
    "Dates And Milestones Are Planning Targets. Future Exchange Availability, Liquidity And Token Price Are Not Guaranteed.",
  closing: {
    title: ["Built In Phases. Powered By", "Participation."],
    description:
      "Avirox Labs will evolve progressively as ecosystem programs, partnerships and utility pathways become ready.",
    primaryLabel: "Explore AVX",
    primaryHref: "/avx",
    secondaryLabel: "How To Participate",
    secondaryHref: "/how-to-participate",
  },
};

export type RoadmapPageVisual =
  | "foundation"
  | "presale"
  | "utility"
  | "ecosystem"
  | "market";

export const roadmapPagePhases: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  visual: RoadmapPageVisual;
  imageFirst?: boolean;
  rounds?: { name: string; dates: string }[];
}[] = [
  {
    number: "01",
    eyebrow: "Phase 01 | Now – November 2026",
    title: "Foundation & Sale\nReadiness",
    description:
      "Finalize the website, whitepaper, presale infrastructure, participation flow, verification requirements, supporting documentation and launch preparation.",
    visual: "foundation",
  },
  {
    number: "02",
    eyebrow: "Phase 02 | 16 November 2026 – 16 February 2027",
    title: "Presale & Public Rounds",
    visual: "presale",
    imageFirst: true,
    rounds: [
      { name: "Private / Strategic", dates: "15 Nov 2026 – 15 Dec 2026" },
      { name: "Public Round 1", dates: "16 Dec 2026 – 15 Jan 2027" },
      { name: "Public Round 2", dates: "16 Jan 2027 – 16 Feb 2027" },
    ],
  },
  {
    number: "04",
    eyebrow: "Phase 04 | Progressive / Subject To Readiness",
    title: "Utility Activation",
    description:
      "Begin activating eligible AVX ecosystem functions as the relevant programs, infrastructure and operational requirements become ready.",
    visual: "utility",
  },
  {
    number: "05",
    eyebrow: "Phase 05 | After Measurable Ecosystem Activity",
    title: "Ecosystem Expansion",
    description:
      "Expand contributor, developer, partner, community and participation programs based on real activity and measurable outcomes.",
    visual: "ecosystem",
    imageFirst: true,
  },
  {
    number: "06",
    eyebrow: "Phase 06 | Conditional Future Milestone",
    title: "Future Market Access",
    description:
      "Evaluate broader liquidity and market-access opportunities as the ecosystem develops and applicable requirements are met.",
    visual: "market",
  },
];
