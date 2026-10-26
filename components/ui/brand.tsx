import Image from "next/image";
import Link from "next/link";

export function BrandMark({ className = "w-10 h-auto" }: { className?: string }) {
  return (
    <Image
      src="/assets/images/logo-simple.png"
      alt=""
      width={178}
      height={161}
      className={className}
    />
  );
}

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <Link href="/#home" aria-label="Avirvox Labs home" className="inline-flex items-center">
      <Image
        src="/assets/images/logo.png"
        alt="Avirvox Labs"
        width={157}
        height={53}
        priority={!large}
        className={large ? "h-auto w-[220px]" : "h-auto w-[145px]"}
      />
    </Link>
  );
}
