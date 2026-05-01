import { tv, type VariantProps } from "tailwind-variants";

const skeleton = tv({
  base: "inline-flex relative overflow-hidden bg-neutral-100/70 rounded",
  variants: {
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
    shimmer: true,
  },
});

type Props = {
  className?: string;
} & VariantProps<typeof skeleton>;

export default function Skeleton({ shimmer, className }: Props) {
  return (
    <span aria-hidden="true" className={skeleton({ shimmer, className })} />
  );
}
