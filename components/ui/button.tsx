import type { AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "gradient" | "outline" | "ghost";
  size?: "default" | "sm";
};

const variants = {
  gradient:
    "bg-gradient-to-r from-[#fc9c27] via-[#e64791] to-[#8d22e7] text-white shadow-[0_8px_28px_#a128ea55] hover:brightness-125",
  outline:
    "border border-[#50394f] bg-[#100b18]/40 text-white hover:border-[#e64791] hover:bg-white/5",
  ghost: "text-white/80 hover:bg-white/5 hover:text-white",
};

const sizes = {
  default: "min-h-11 px-7 text-xs",
  sm: "min-h-[34px] px-4 text-[10px]",
};

export function Button({
  variant = "gradient",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-full font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
