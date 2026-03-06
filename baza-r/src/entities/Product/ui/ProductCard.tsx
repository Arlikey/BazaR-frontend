import { tv, type VariantProps } from "tailwind-variants";
import {
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import type { Product } from "../model/Product";

const card = tv({
  slots: {
    root: "hover:scale-103 hover:z-10 transition-transform py-5 relative grid min-w-0 w-full h-full overflow-hidden rounded-xl bg-surface bw-thin border-solid border-neutral-300 grid-rows-[auto_1fr_auto_auto]",
    top: "relative px-0",
    media:
      "flex items-center justify-center overflow-visible h-[150px] mx-auto",
    img: "max-h-full max-w-full object-contain",
    topLeft: "absolute left-4 top-4 z-10 flex flex-col gap-2",
    RootRight: "absolute right-1 top-3 z-10 flex flex-col gap-2",
    body: "mt-6 px-5 min-w-0",
    title:
      "w-full min-w-0 text-sm font-normal line-clamp-2 [overflow-wrap:anywhere]",
    meta: "text-sm min-w-0 [overflow-wrap:anywhere]",
    prices: "grid gap-1 min-w-0",
    oldPrice:
      "min-w-0 truncate text-sm text-neutral-300 line-through leading-none",
    currentPrice: "min-w-0 truncate text-base font-normal leading-none",
    currency: "text-[11px]",
    footer: "flex flex-col px-5 min-w-0",
  },
  variants: {
    size: {
      sm: {
        media: "h-[150px]",
        title: "text-sm",
        oldPrice: "text-sm",
        currentPrice: "text-base",
        currency: "text-[11px]",
        prices: "gap-1 mt-2",
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
        top: "",
        body: "",
        prices: "",
        footer: "",
        title: "",
        currentPrice: "",
      },
    },
  },
  defaultVariants: { size: "sm", variant: "compact" },
});

type ProductCardVariants = VariantProps<typeof card>;

type ProductCardRootProps = {
  product: Product;
  formatPrice?: (v: number) => string;
  children: ReactNode;
} & ProductCardVariants &
  Omit<HTMLAttributes<HTMLElement>, "children">;

type ProductCardContextValue = {
  product: Product;
  styles: ReturnType<typeof card>;
  formatPrice: (value: number) => string;
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

function formatPriceUAH(value: number): string {
  return new Intl.NumberFormat("uk-UA").format(value);
}

function Root({
  product,
  size,
  variant = "compact",
  formatPrice = formatPriceUAH,
  className,
  children,
  ...rest
}: ProductCardRootProps) {
  const styles = card({ variant, size });

  return (
    <ProductCardContext.Provider value={{ product, styles, formatPrice }}>
      <article className={styles.root({ className })} {...rest}>
        <div className="contents">{children}</div>
      </article>
    </ProductCardContext.Provider>
  );
}

type SlotProps = { children?: ReactNode; className?: string };

function Top({ children, className }: SlotProps) {
  const { styles } = useProductCard();
  return <header className={styles.top({ className })}>{children}</header>;
}

type MediaProps = {
  alt?: string;
  className?: string;
  fallback?: ReactNode;
};

function Media({ alt, className, fallback }: MediaProps) {
  const { product, styles } = useProductCard();

  return (
    <div className={styles.media({ className })}>
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={alt ?? product.name}
          loading="lazy"
          decoding="async"
          className={styles.img()}
        />
      ) : (
        (fallback ?? (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
            No image
          </div>
        ))
      )}
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

function Prices({ className, currency = "₴" }: PricesProps) {
  const { product, styles, formatPrice } = useProductCard();
  const old = product.oldPrice;
  const current = product.currentPrice;

  const hasOld = old != null;
  const hasCurrent = current != null;
  const isPromo = hasOld && hasCurrent && old > current;

  return (
    <div className={styles.prices({ className })}>
      <div className={styles.oldPrice()}>
        {hasOld && isPromo && (
          <>
            {formatPrice(product.oldPrice!)}{" "}
            <span className={styles.currency()}>{currency}</span>
          </>
        )}
      </div>
      <div
        className={`${styles.currentPrice()} ${isPromo ? "text-promotion" : ""}`}
      >
        {hasCurrent && (
          <>
            {formatPrice(product.currentPrice!)}{" "}
            <span className={styles.currency()}>{currency}</span>
          </>
        )}
      </div>
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
