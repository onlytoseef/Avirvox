export const avxPageContent = {
  eyebrow: "AVX Utility Token",
  title: ["AVX Powering", "Participation"],
  description:
    "AVX is the fixed-supply utility token inside the Avirox Labs ecosystem, designed to support eligible ecosystem functions and participation pathways as they become ready.",
  supplyEyebrow: "Token Overview",
  supplyTitle: "Fixed Supply. Defined Structure.",
  saleEyebrow: "Sale Structure",
  saleTitle: "Three Rounds. One Rising Price.",
  saleCaption: "Bar Height Reflects Price Per AVX",
  releaseEyebrow: "Token Release",
  releaseTitle: "TGE — 15 March 2027",
  founderTitle: "Founder Allocation",
  founderDescription:
    "0% Of The Founder Allocation Is Released At TGE, With A 12-Month Cliff And Remaining Tokens Vesting Over 36 Months.",
  vestingTitle: "Purchaser Vesting Schedule",
  boundaryEyebrow: "Important Boundary",
  boundaryTitle: ["Clear Roles. Independent", "Enterprise Access."],
  boundaryParagraphs: [
    "Avirox Labs and AVX support participation across the broader ecosystem, while Avirox Inc. operates independently as the enterprise product company. Enterprise customers can access Avirox Inc. products and services without holding or using AVX.",
    "AVX does not provide ownership, control or governance rights over Avirox Inc., its customers, data or enterprise operations.",
  ],
};

export const fixedSupplyDetails = [
  { label: "Total Supply", value: "1,000,000,000 AVX" },
  {
    label: "Maximum Sale Allocation",
    value: "30%",
    detail: "300,000,000 AVX",
  },
  { label: "Network", value: "BNB Smart Chain" },
  { label: "Standard", value: "BEP-20" },
];

export const saleRounds = [
  {
    name: "Private / Strategic",
    dates: "15 Nov – 15 Dec 2026",
    amount: "50M AVX",
    price: "$0.015",
    barHeight: 60,
    gradient: "private",
  },
  {
    name: "Public Round 1",
    dates: "16 Dec 2026 – 15 Jan 2027",
    amount: "150M AVX",
    price: "$0.020",
    barHeight: 80,
    gradient: "roundOne",
  },
  {
    name: "Public Round 2",
    dates: "16 Jan – 15 Feb 2027",
    amount: "100M AVX",
    price: "$0.030",
    barHeight: 100,
    gradient: "roundTwo",
  },
] as const;

export const tokenReleaseDetails = [
  { label: "Token Release", value: "TGE" },
  { label: "TGE Date", value: "15 March 2027" },
  { label: "Founder Allocation", value: "0% At TGE" },
  { label: "Cliff", value: "12 Months" },
  { label: "Vesting", value: "36 Months" },
];

export const vestingSchedules = [
  {
    name: "Private / Strategic",
    dates: "15 Nov 2026–15 Dec 2026",
    atTge: "10%",
    cliffValue: "3",
    cliffLabel: "Months Cliff",
    remaining: "90%",
    duration: "Over 12 Months",
    description: "10% Released At TGE. 3-Month Cliff. Remaining 90% Vesting Over 12 Months.",
  },
  {
    name: "Public Round 1",
    dates: "16 Dec 2026–15 Jan 2027",
    atTge: "20%",
    cliffValue: "–",
    cliffLabel: "No Cliff",
    remaining: "80%",
    duration: "Over 6 Months",
    description: "20% Released At TGE. Remaining 80% Vesting Over 6 Months.",
  },
  {
    name: "Public Round 2",
    dates: "16 Jan 2027–15 Feb 2027",
    atTge: "25%",
    cliffValue: "–",
    cliffLabel: "No Cliff",
    remaining: "75%",
    duration: "Over 3 Months",
    description: "25% Released At TGE. Remaining 75% Vesting Over 3 Months.",
  },
] as const;
