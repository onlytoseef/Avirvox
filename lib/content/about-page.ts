export const aboutPageContent = {
  hero: {
    eyebrow: "About Avirox Labs",
    description:
      "Avirox Labs is focused on building the participation ecosystem around the broader Avirox vision — connecting communities, creators, contributors, developers and partners through defined ecosystem programs and the phased AVX utility layer.",
  },
  boundaries: {
    eyebrow: "About Avirox Labs",
    title: "Participation With Clear Boundaries",
    focus:
      "Avirox Labs focuses on ecosystem participation, community programs, partnerships and AVX utility.",
    enterprise:
      "Avirox Inc. operates independently as the enterprise product company developing the Enterprise Media Lifecycle Platform.",
    closing: "Clear Roles. Independent Operations. One Broader Vision.",
  },
  resources: {
    eyebrow: "Resources",
    title: ["Everything You Need To", "Verify And Understand AVX"],
  },
  contract: {
    eyebrow: "AVX Contract & Audit",
    title: "Verify Before You Participate",
    addressLabel: "Official Contract",
    address: "0x4727d9A390Aa7bc001C52E4b1E9c9D990F12E99b",
    auditLabel: "Audit Status",
    auditStatus: "Audited",
    auditDescription:
      "Use only official AVX contract and audit information when it is published through verified Avirox Labs channels.",
    auditNote:
      "An independent audit does not guarantee that a smart contract is free from all vulnerabilities or risks.",
  },
  team: {
    eyebrow: "Leadership Team",
    title: "Meet The Team",
    description:
      "A focused leadership team bringing together strategy, technology, ecosystem development, governance and compliance.",
  },
  faq: {
    eyebrow: "Frequently Asked Questions",
    title: "Answers, Plainly.",
  },
  contact: {
    eyebrow: "Contact Avirox Labs",
    title: ["Have A Question Or Want To", "Connect?"],
    description: "Choose the inquiry type that best matches your request.",
  },
  channels: {
    eyebrow: "Official Channels",
    title: ["Follow The Official Avirox", "Labs Channels"],
    description:
      "Follow only verified channels for official company, AVX, ecosystem and participation updates.",
  },
};

export const resourceCards = [
  {
    title: "Whitepaper",
    description: "Explore the Avirox Labs vision, ecosystem structure, AVX utility and token framework.",
    action: "Read Whitepaper",
    href: "/whitepaper",
  },
  {
    title: "Token Sale Terms",
    description: "Review the terms governing AVX sale participation.",
    action: "View Terms",
    href: "/token-sale-terms",
  },
  {
    title: "Eligibility",
    description: "Understand jurisdictional restrictions and participation requirements.",
    action: "View Eligibility",
    href: "/about#resources",
  },
  {
    title: "KYC / AML",
    description: "Review identity verification, compliance and participation requirements.",
    action: "View KYC / AML",
    href: "/kyc-aml-notice",
  },
  {
    title: "Privacy & Cookie Policy",
    description: "See how personal information, cookies and website data are handled.",
    action: "Read Policy",
    href: "/privacy-cookie-policy",
  },
  {
    title: "Terms of Use",
    description: "Review the terms for using the Avirvox Labs website and online services.",
    action: "Read Terms",
    href: "/terms-of-use",
  },
  {
    title: "Accessibility Statement",
    description: "Read our approach to digital accessibility and support.",
    action: "Read Statement",
    href: "/accessibility-statement",
  },
] as const;

export const tokenFacts = [
  ["Token", "Avirox"],
  ["Symbol", "AVX"],
  ["Network", "BNB Smart Chain"],
  ["Standard", "BEP-20"],
  ["Supply", "Fixed Supply / No Future Minting"],
] as const;

export const leadershipTeam = [
  {
    name: "Randeep Pahwa",
    role: "Founder & CEO",
    image: "/assets/images/Founder & CEO.png",
    description:
      "Leads strategy, capital formation, ecosystem growth, strategic partnerships and overall execution.",
  },
  {
    name: "Rajeev Teotia",
    role: "Chief Technical Officer (CTO)",
    image: "/assets/images/Chief Technical Officer (CTO).png",
    description:
      "Leads technical architecture, AVX and presale engineering, security, infrastructure and scalability.",
  },
  {
    name: "Gagan Anand",
    role: "Head of Ecosystem",
    image: "/assets/images/Head of Ecosystem.png",
    description:
      "Leads ecosystem development, partnerships, integrations, participation programs and execution coordination.",
  },
  {
    name: "Rupinder Kaur",
    role: "Head of Governance & Compliance",
    image: "/assets/images/Head of Governance & Compliance.png",
    description:
      "Leads governance, compliance, policy coordination, risk awareness and responsible ecosystem participation.",
  },
] as const;

export const aboutQuestions = [
  {
    question: "What is Avirox Labs?",
    answer:
      "Avirox Labs is the participation and ecosystem company around the broader Avirox vision, focused on community, partnerships, ecosystem programs and the phased AVX utility layer.",
  },
  {
    question: "What is AVX?",
    answer:
      "AVX is the fixed-supply utility token within the Avirox Labs ecosystem. Its utility is planned to activate as eligible ecosystem programs become ready.",
  },
  {
    question: "Is AVX required to use Avirox Inc.?",
    answer:
      "No. Avirox Inc. operates independently. Enterprise customers can access its products and services without holding AVX.",
  },
  {
    question: "Does AVX represent equity or ownership?",
    answer:
      "No. AVX does not provide ownership, control or governance rights over Avirox Inc., its customers, data or enterprise operations.",
  },
  {
    question: "Who can participate in AVX?",
    answer:
      "Participation is subject to the applicable eligibility, jurisdictional, KYC/AML and token sale requirements.",
  },
  {
    question: "Is KYC required?",
    answer:
      "Identity verification requirements depend on the applicable participation terms and jurisdiction.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "The participation flow describes supported assets including BNB, USDT and USDC. Confirm current options only through official Avirox Labs channels.",
  },
  {
    question: "How do I track or claim AVX?",
    answer:
      "The official participant dashboard is intended to show allocations, vesting status and claimable AVX when those functions are available.",
  },
  {
    question: "Are investment returns guaranteed?",
    answer:
      "No. Returns, liquidity, utility activation and exchange listing are not guaranteed. Digital asset participation involves risk.",
  },
] as const;

export { socialLinks as officialChannels } from "./social-links";
