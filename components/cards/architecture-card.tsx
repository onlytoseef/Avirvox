import Image from "next/image";
import { ecosystemRoles } from "@/lib/content/ecosystem-page";

function RoleVisual({ role }: { role: (typeof ecosystemRoles)[number] }) {
  if (role.id === "inc") {
    return (
      <Image
        src="/assets/images/avirvox-inc.png"
        alt=""
        width={155}
        height={155}
        className="h-[136px] w-auto object-contain"
      />
    );
  }

  if (role.id === "avx") {
    return (
      <Image
        src="/assets/images/avirvox-circle.png"
        alt=""
        width={130}
        height={135}
        className="h-[136px] w-auto object-contain"
      />
    );
  }

  return (
    <Image
      src="/assets/images/logo-simple.png"
      alt=""
      width={160}
      height={145}
      className="h-[136px] w-auto object-contain"
    />
  );
}

export function ArchitectureCard({ role }: { role: (typeof ecosystemRoles)[number] }) {
  return (
    <article className="flex min-h-[390px] flex-col items-center rounded-[30px] border border-[#5b4b63] bg-[#090511] px-7 py-6 text-center">
      <div className="flex h-[136px] items-center justify-center">
        <RoleVisual role={role} />
      </div>
      <p className="mt-2 text-sm font-medium uppercase text-[#f2e7f1]">{role.name}</p>
      <h3 className="mt-3 bg-gradient-to-b from-[#ff8f25] via-[#e84b84] to-[#b42ddd] bg-clip-text font-[family-name:var(--font-display)] text-[clamp(1.7rem,2.25vw,2.3rem)] leading-[0.95] tracking-[-0.035em] uppercase text-transparent">
        {role.title.map((line) => (
          <span key={line} className="block">{line}</span>
        ))}
      </h3>
      <div className="mt-4 h-px w-40 bg-gradient-to-r from-transparent via-[#7f5a83] to-transparent" />
      <p className="mt-4 max-w-[370px] text-xs leading-[1.4] text-[#f0e7ef] sm:text-sm">
        {role.description}
      </p>
    </article>
  );
}

