import { tv, type VariantProps } from "tailwind-variants";
import {
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import type { Product } from "../model/Product";
import {
  formatPrice,
  getCurrencySymbol,
} from "@/shared/lib/formatMoney";
import { isDiscount } from "@/shared/lib/price";

import placeholder from "@/shared/assets/images/placeholder.webp";

const card = tv({
  slots: {
    root: "hover:shadow-[0_6px_8px_2px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:z-10 transition-all py-5 relative grid min-w-0 w-full h-full rounded-xl bg-surface bw-thin border-solid border-neutral-100 grid-rows-[auto_1fr_auto]",
    top: "relative px-0",
    media:
      "flex items-center justify-center overflow-visible h-[150px] mx-auto",
    img: "max-h-full max-w-full object-contain",
    topLeft: "absolute left-4 top-3 z-10 flex flex-col gap-2",
    RootRight: "absolute right-1 top-3 z-10 flex flex-col gap-2",
    body: "mt-6 px-3 sm:px-5 min-w-0",
    title:
      "w-full min-w-0 text-sm font-normal line-clamp-2 [overflow-wrap:anywhere]",
    meta: "text-sm min-w-0 [overflow-wrap:anywhere]",
    prices: "grid gap-2 min-w-0 items-end",
    oldPrice: "min-w-0 truncate text-sm text-neutral-300 leading-none",
    currentPrice: "min-w-0 truncate text-base font-normal leading-none",
    currency: "text-[11px]",
    currencyOldPrice: "text-xs",
    footer: "flex flex-col pl-3 sm:pl-5 pr-1 min-w-0",
  },
  variants: {
    size: {
      sm: {
        media: "h-[150px]",
        title: "text-sm",
        oldPrice: "text-sm",
        currentPrice: "text-base",
        currency: "text-[11px]",
        prices: "mt-1 gap-1",
      },
      md: {
        root: "py-2",
        media: "h-[160px]",
        body: "mt-2",
        RootRight: "right-4 top-4",
        title: "text-base min-h-[40px]",
        oldPrice: "text-md",
        currentPrice: "text-xl",
        currency: "text-md",
        prices: "gap-1",
      },
      lg: {
        media: "h-[350px]",
        title: "text-xl",
        oldPrice: "text-xl",
        RootRight: "right-4 top-4",
        currentPrice: "text-4xl",
        currency: "text-xl",
        prices: "gap-3",
        footer: "gap-2",
      },
    },
    variant: {
      compact: {},
      rich: {
        root: "hover:scale-102 gap-2",
        top: "relative px-0",
        media:
          "flex items-center justify-center h-[220px] mx-auto w-full px-2 sm:px-6 my-4 sm:my-12",
        img: "max-h-full max-w-full object-contain",
        topLeft: "absolute left-5 top-0 z-10 flex flex-col gap-2",
        RootRight: "absolute right-1 -top-2 z-10 flex flex-col gap-1",
        body: "mt-2 px-2 sm:px-5 min-w-0",
        title:
          "w-full min-w-0 text-base font-normal h-[42px] line-clamp-2 [overflow-wrap:anywhere]",
        meta: "text-sm min-w-0 [overflow-wrap:anywhere] mt-1",
        prices: "grid gap-2 min-w-0 h-[54px]",
        oldPrice: "min-w-0 truncate text-base text-neutral-300 leading-none",
        currentPrice: "min-w-0 truncate text-2xl font-normal leading-none",
        currency: "text-xl",
        currencyOldPrice: "text-xs",
        footer: "flex flex-col min-w-0 gap-3",
      },
    },
    disabled: {
      true: {
        root: "relative after:absolute after:inset-0 after:bg-neutral-100/50 after:content-[''] after:pointer-events-none after:rounded-xl",
      },
    },
  },
  defaultVariants: { size: "sm", variant: "compact" },
});

type ProductCardVariants = VariantProps<typeof card>;

type ProductCardRootProps = {
  product: Product;
  children: ReactNode;
} & ProductCardVariants &
  Omit<HTMLAttributes<HTMLElement>, "children">;

type ProductCardContextValue = {
  product: Product;
  styles: ReturnType<typeof card>;
};

const ProductCardContext = createContext<ProductCardContextValue | null>(null);

function useProductCard() {
  const ctx = useContext(ProductCardContext);
  if (!ctx)
    throw new Error("ProductCard.* must be used within ProductCard.Root");
  return ctx;
}

export function useProductCardProduct(): Product {
  return useProductCard().product;
}

function Root({
  product,
  size,
  variant = "compact",
  disabled,
  className,
  children,
  ...rest
}: ProductCardRootProps) {
  const styles = card({ variant, size, disabled });

  return (
    <ProductCardContext.Provider value={{ product, styles }}>
      <article className={styles.root({ className })} {...rest}>
        {children}
      </article>
    </ProductCardContext.Provider>
  );
}

type SlotProps = { children?: ReactNode; className?: string };

function Top({ children, className }: SlotProps) {
  const { styles } = useProductCard();
  return <div className={styles.top({ className })}>{children}</div>;
}

type MediaProps = {
  alt?: string;
  className?: string;
  fallback?: ReactNode;
};

function Media({ alt, className }: MediaProps) {
  const { product, styles } = useProductCard();

  return (
    <div className={styles.media({ className })}>
      <img
        src={product.imageUrl ?? placeholder}
        alt={alt ?? product.name}
        loading="lazy"
        decoding="async"
        className={styles.img()}
        onError={(e) => {
          e.currentTarget.src = placeholder;
        }}
      />
    </div>
  );
}

function TopLeft({ children, className }: SlotProps) {
  const { styles } = useProductCard();
  return <div className={styles.topLeft({ className })}>{children}</div>;
}

function RootRight({ children, className }: SlotProps) {
  const { styles } = useProductCard();
  return <div className={styles.RootRight({ className })}>{children}</div>;
}

function Body({ children, className }: SlotProps) {
  const { styles } = useProductCard();
  return <div className={styles.body({ className })}>{children}</div>;
}

function Title({ className }: { className?: string }) {
  const { product, styles } = useProductCard();
  return <h3 className={styles.title({ className })}>{product.name}</h3>;
}

function Meta({ children, className }: SlotProps) {
  const { styles } = useProductCard();
  return <div className={styles.meta({ className })}>{children}</div>;
}

type PricesProps = {
  className?: string;
  currency?: string;
};

function Prices({ className }: PricesProps) {
  const { product, styles } = useProductCard();

  const old = product.oldPrice;
  const current = product.currentPrice;

  const hasOld = old != null;
  const hasCurrent = current != null;

  const isPromo = isDiscount(old, current);

  return (
    <div className={styles.prices({ className })}>
      {hasOld && isPromo && (
        <div className={styles.oldPrice()}>
          <span className="line-through">{formatPrice(old)}</span>
          {"\u00A0"}
          <span className={styles.currencyOldPrice()}>
            {getCurrencySymbol(product.currency!)}
          </span>
        </div>
      )}

      {hasCurrent && (
        <div
          className={`${styles.currentPrice()} ${
            isPromo ? "text-promotion" : ""
          }`}
        >
          {formatPrice(current)}
          {"\u00A0"}
          <span className={styles.currency()}>
            {getCurrencySymbol(product.currency!)}
          </span>
        </div>
      )}
    </div>
  );
}

function Footer({ children, className }: SlotProps) {
  const { styles } = useProductCard();
  return <div className={styles.footer({ className })}>{children}</div>;
}

export const ProductCard = {
  Root,
  Top,
  Media,
  TopLeft,
  RootRight,
  Body,
  Title,
  Meta,
  Prices,
  Footer,
};
