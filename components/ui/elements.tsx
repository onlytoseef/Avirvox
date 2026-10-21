import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ChildrenProps = { children: ReactNode };

type HeadingProps = ChildrenProps & {
  eyebrow: string;
  description?: string;
  titleClassName?: string;
};

export function Eyebrow({
  children,
  className = "",
}: ChildrenProps & { className?: string }) {
  return (
    <Badge className={`uppercase tracking-[0.14em] ${className}`}>
      <span className="size-1.5 rounded-full bg-[#ec37df] shadow-[0_0_10px_#ec37df]" />
      {children}
    </Badge>
  );
}

export function Heading({
  eyebrow,
  children,
  description,
  titleClassName = "",
}: HeadingProps) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`relative mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight font-normal tracking-tight text-[#f3e8ee] md:text-5xl xl:text-6xl ${titleClassName}`}>
        {children}
        <span aria-hidden="true" className="absolute -bottom-3 left-1/2 h-px w-28 -translate-x-1/2 bg-gradient-to-r from-[#ec468d] to-[#a026dd]" />
      </h2>
      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#b9aebd] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

type ButtonLinkProps = ChildrenProps & {
  href: string;
  size?: "default" | "sm";
  className?: string;
};

export function GradientButton({
  href,
  children,
  size = "default",
  className,
}: ButtonLinkProps) {
  return (
    <Button href={href} variant="gradient" size={size} className={className}>
      {children}
    </Button>
  );
}

export function OutlineButton({
  href,
  children,
  size = "default",
  className,
}: ButtonLinkProps) {
  return (
    <Button href={href} variant="outline" size={size} className={className}>
      {children}
    </Button>
  );
}
