import type { HTMLAttributes } from "react";
import Skeleton from "./Skeleton";
import { tv, type VariantProps } from "tailwind-variants";

type CardVariant = "compact" | "rich";

const productCardSkeleton = tv({
  slots: {
    root: "relative grid h-full w-full overflow-hidden rounded-xl bg-surface bw-thin border-solid border-neutral-100 grid-rows-[auto_1fr_auto]",
    top: "relative pt-5",
    mediaWrap:
      "relative flex items-center justify-center overflow-hidden rounded-lg bg-surface px-8 aspect-[16/9]",
    body: "mt-6 mb-8 px-5 pr-1",
    footer: "flex items-end justify-between px-5 pr-1 pb-6",
  },
  variants: {
    variant: {
      compact: {},
    },
  },
  defaultVariants: {
    variant: "compact",
  },
});

type Props = {
  variant?: CardVariant;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children"> &
  VariantProps<typeof productCardSkeleton>;

export default function ProductCardSkeleton({
  variant = "compact",
  className,
  ...rest
}: Props) {
  const s = productCardSkeleton({ variant });

  return (
    <article className={s.root({ className })} aria-busy="true" {...rest}>
      <header className={s.top()}>
        <div className={s.mediaWrap()}>
          <Skeleton className="h-full w-full rounded-lg opacity-70" />
        </div>
      </header>

      <div className={s.body()}>
        <div className="flex flex-col space-y-1.5">
          <Skeleton className="h-3 w-9/10" />
          <Skeleton className="h-3 w-4/10" />
        </div>
      </div>

      <div className={s.footer()}>
        <Skeleton className="h-3.5 w-3/10" />
      </div>
    </article>
  );
}
