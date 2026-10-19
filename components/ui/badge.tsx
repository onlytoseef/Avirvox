import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline" | "status";
};

const variants = {
  default: "border-[#5f2b69] bg-[#16091d] text-[#eadbec]",
  outline: "border-[#4f3659] bg-white/5 text-white/80",
  status: "border-[#4f3659] bg-white/5 text-[#c4b9c9]",
};

export function Badge({
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
