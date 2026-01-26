import React from "react";
import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { Product } from "../model/Product";
import Button from "../../../shared/components/ui/Button";
import FavouriteIcon from "../../../shared/components/icons/ui/FavouriteIcon";

const productCard = tv({
  slots: {
    root: "cursor-pointer relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-on-light bw-thin border-neutral-300 py-5 hover:scale-105 transition-transform",
    mediaInner: "flex justify-center rounded-lg bg-white aspect-[16/9]",
    img: "inset-0 object-contain ",
    content: "flex flex-1 flex-col justify-between gap-2 pl-7 pr-1 mt-7",
    name: "text-[12px] font-normal line-clamp-2",
    prices: "flex flex-col gap-2",
    oldPrice: "text-[12px] text-neutral-300 line-through",
    currentPrice: "text-[14px] font-normal",
    currency: "text-[11px]",
    favBtn:
      "absolute right-2 top-2 overflow-hidden bg-white hover:bg-hover-light-primary/15",
  },
  variants: {
    intent: {
      default: {},
      promo: { currentPrice: "text-promotion" },
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

type Props = {
  product: Product;
  className?: string;

  onFavouriteClick?: (product: Product) => void;
  favouriteAriaLabel?: string;

  formatPrice?: (value: number) => string;
} & VariantProps<typeof productCard>;

function formatPriceUAH(value: number): string {
  return new Intl.NumberFormat("uk-UA").format(value);
}

export function ProductCard({
  product,
  className,
  onFavouriteClick,
  favouriteAriaLabel = "Add to favourites",
  formatPrice = formatPriceUAH,
}: Props) {
  const hasOldPrice = product.oldPrice !== null;
  const isPromo = hasOldPrice && product.oldPrice! > product.currentPrice;

  const styles = productCard({
    intent: isPromo ? "promo" : "default",
  });

  return (
    <article className={styles.root({ className })}>
      <div className={styles.mediaInner()}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={styles.img()}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[12px] text-neutral-400">
            No image
          </div>
        )}
      </div>

      <div className={styles.content()}>
        <span className={styles.name()}>{product.name}</span>

        <div className={styles.prices()}>
          {hasOldPrice && (
            <span className={styles.oldPrice()}>
              {formatPrice(product.oldPrice!)}{" "}
              <span className={styles.currency()}>₴</span>
            </span>
          )}

          <span className={styles.currentPrice()}>
            {formatPrice(product.currentPrice)}{" "}
            <span className={styles.currency()}>₴</span>
          </span>
        </div>
      </div>

      <Button
        className={styles.favBtn()}
        shape="icon"
        aria-label={favouriteAriaLabel}
        onClick={() => onFavouriteClick?.(product)}
      >
        <FavouriteIcon size="25" />
      </Button>
    </article>
  );
}
