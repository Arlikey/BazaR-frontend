import type { HTMLAttributes } from "react";
import Skeleton from "./Skeleton";
import { tv, type VariantProps } from "tailwind-variants";

type CardVariant = "compact" | "rich";

const productCardSkeleton = tv({
  slots: {
    root: "relative grid h-full w-full overflow-hidden rounded-xl bg-on-light bw-thin border-solid border-neutral-300 grid-rows-[auto_1fr_auto_auto]",
    top: "relative pt-5",
    mediaWrap:
      "relative flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 aspect-[16/9]",
    body: "mt-6 pl-7 pr-1",
    footer: "flex items-end justify-between gap-3 pl-7 pr-1 pb-5",
    priceStack: "flex flex-col gap-2",
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
          <Skeleton width="100%" height="100%" className="rounded-lg" />
        </div>
      </header>

      <div className={s.body()}>
        <div className="space-y-2">
          <Skeleton variant="line" width={"90%"} height={12} />
          <Skeleton variant="line" width={"50%"} height={12} />
        </div>
      </div>

      <div className={s.footer()}>
        <div className={s.priceStack()}>
          <Skeleton
            variant="line"
            width={72}
            height={12}
            className="opacity-70"
          />
          <Skeleton variant="line" width={96} height={14} />
        </div>
      </div>
    </article>
  );
}
