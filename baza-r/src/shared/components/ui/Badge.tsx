import type { ReactNode } from "react";

type Props = {
  count?: number;
  children?: ReactNode;
  variant?: "accent" | "subtle";
};

const variantStyles = {
  accent: "bg-accent text-black",
  subtle: "bg-subtle text-white",
};

export function Badge({ count, children, variant = "accent" }: Props) {
  if (!children && (!count || count <= 0)) return null;

  const content = children ?? (count! > 99 ? "99+" : count);

  return (
    <span
      className={`${variantStyles[variant]} absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-xs font-medium tracking-tighter`}
    >
      {content}
    </span>
  );
}
