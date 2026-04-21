import type { ReactNode } from "react";
import { cn } from "tailwind-variants";

type Props = {
  className?: string;
  count?: number;
  children?: ReactNode;
  variant?: "accent" | "subtle";
};

const variantStyles = {
  accent: "bg-accent text-black",
  subtle: "bg-subtle text-white",
};

export function Badge({
  className,
  count,
  children,
  variant = "accent",
}: Props) {
  if (!children && (!count || count <= 0)) return null;

  const content = children ?? (count! > 99 ? "99+" : count);

  return (
    <span
      className={cn(
        variantStyles[variant],
        "absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-xs font-medium tracking-tighter",
        className,
      )}
    >
      {content}
    </span>
  );
}
