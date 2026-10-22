export const participatePageContent = {
  eyebrow: "How to Participate",
  title: ["AVX Participation,", "Made Clear"],
  introduction:
    "A clear and transparent process for eligible participants to participate in AVX through official Avirox Labs channels.",
  security: {
    eyebrow: "Verify Before You Participate",
    title: "Stay Official. Stay Secure.",
    description:
      "Protect your participation by using only verified Avirox Labs information and official transaction channels.",
    warningTitle: "Never",
    warnings: [
      "Share your seed phrase or private key.",
      "Send funds to an unverified address.",
      "Connect your wallet to an unofficial site.",
      "Trust unsolicited messages about AVX claims.",
    ],
    contractLabel: "Official AVX Contract",
    contractAddress: "0x4727d9A390Aa7bc001C52E4b1E9c9D990F12E99b",
  },
};

export const participationSteps = [
  {
    number: "01",
    label: "Set Up Your Wallet",
    title: "Set Up Your Wallet",
    description: [
      "Download a compatible EVM wallet such as MetaMask or Trust Wallet.",
      "Create your wallet and securely back up your recovery phrase.",
    ],
    note: "IMPORTANT\nNever share your seed phrase, private key or recovery credentials.",
    action: { label: "View Eligibility", href: "/about#resources" },
  },
  {
    number: "02",
    label: "Buy Crypto",
    title: "Buy Crypto",
    description: [
      "Buy BNB, USDT, USDC or other supported crypto assets from a trusted exchange such as Binance, Coinbase, Kraken or KuCoin.",
    ],
    note: "Make sure you have sufficient BNB available for network fees.",
    action: { label: "View KYC / AML", href: "/kyc-aml-notice" },
  },
  {
    number: "03",
    label: "Fund Your Wallet",
    title: "Fund Your Wallet",
    description: ["Transfer the supported assets to your EVM wallet."],
    note: "NETWORK: Ensure you are using BNB Smart Chain (BEP-20) before transferring funds.",
  },
  {
    number: "04",
    label: "Connect & Select",
    title: "Connect & Select",
    description: [
      "Visit the official Avirox Labs presale page and connect your wallet.",
    ],
    note: "Select BNB, USDT or USDC, enter your participation amount and review the corresponding AVX allocation.",
  },
  {
    number: "05",
    label: "Complete Your Purchase",
    title: "Complete Your Purchase",
    description: [
      "Review the active sale round, AVX price, payment amount, network details and applicable terms before confirming the transaction.",
    ],
    note: "Once your transaction is successfully received and confirmed, your AVX allocation will be recorded in your participant dashboard.",
  },
  {
    number: "06",
    label: "Track & Claim Your AVX",
    title: "Track & Claim Your AVX",
    description: ["Use the official participant dashboard to view:"],
    details: ["Purchase History", "Allocated AVX", "Vesting Status", "Claimable AVX", "Claimed AVX"],
    note: "At TGE, eligible AVX will become claimable according to the vesting schedule applicable to your sale round.",
  },
];
