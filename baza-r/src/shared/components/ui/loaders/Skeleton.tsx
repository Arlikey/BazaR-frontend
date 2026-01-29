import type { CSSProperties } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const skeleton = tv({
  base: "relative overflow-hidden bg-neutral-200/70",
  variants: {
    variant: {
      rect: "rounded-sm",
      line: "rounded",
      circle: "rounded-full",
    },
    shimmer: {
      true: [
        "after:content-[''] after:absolute after:inset-0 after:-translate-x-full",
        "after:bg-[linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.2)_20%,rgba(255,255,255,0.5)_60%,rgba(255,255,255,0)_100%)]",
        "after:animate-[shimmer_1.5s_ease-in-out_infinite]",
        "motion-reduce:after:animate-none",
      ].join(" "),
      false: "",
    },
  },
  defaultVariants: {
    variant: "rect",
    shimmer: true,
  },
});

type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
} & VariantProps<typeof skeleton>;

function toSize(value?: number | string): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

export default function Skeleton({
  variant,
  shimmer,
  width,
  height,
  className,
}: Props) {
  const style: CSSProperties = {
    width: toSize(width),
    height: toSize(height),
  };

  return (
    <div
      aria-hidden="true"
      className={skeleton({ variant, shimmer, className })}
      style={style}
    />
  );
}
