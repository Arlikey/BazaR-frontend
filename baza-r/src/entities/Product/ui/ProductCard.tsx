import { tv, type VariantProps } from "tailwind-variants";
import {
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import type { Product } from "../model/Product";

type CardVariant = "compact" | "rich";

const card = tv({
  slots: {
    root: "relative grid h-full w-full overflow-hidden rounded-xl bg-on-light bw-thin border-solid border-neutral-300 grid-rows-[auto_1fr_auto_auto]",
    top: "relative pt-5 px-0",
    media:
      "relative flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 aspect-[16/9]",
    img: "h-full w-full object-contain",
    topLeft: "absolute left-4 top-4 z-10 flex flex-col gap-2",
    topRight: "absolute right-1 top-3 z-10 flex flex-col gap-2",
    body: "mt-6 pl-7 pr-1",
    title: "text-[12px] font-normal line-clamp-2",
    meta: "",
    prices: "mt-2",
    oldPrice: "text-[12px] text-neutral-300 line-through",
    currentPrice: "text-[14px] font-normal mt-2",
    currency: "text-[11px]",
    footer: "flex items-end justify-between gap-3 pl-7 pr-1 pb-5",
  },
  variants: {
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
  defaultVariants: { variant: "compact" },
});

type ProductCardContextValue = {
  product: Product;
  variant: CardVariant;
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

export type ProductCardRootProps = {
  product: Product;
  variant?: CardVariant;
  formatPrice?: (value: number) => string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "children"> &
  VariantProps<typeof card>;

function Root({
  product,
  variant = "compact",
  formatPrice = formatPriceUAH,
  className,
  children,
  ...rest
}: ProductCardRootProps) {
  const styles = card({ variant });

  return (
    <ProductCardContext.Provider
      value={{ product, variant, styles, formatPrice }}
    >
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
          <div className="flex h-full w-full items-center justify-center text-[12px] text-neutral-400">
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

function TopRight({ children, className }: SlotProps) {
  const { styles } = useProductCard();
  return <div className={styles.topRight({ className })}>{children}</div>;
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
  const hasOld = product.oldPrice !== null;
  const isPromo = hasOld && product.oldPrice! > product.currentPrice;

  return (
    <div className={styles.prices({ className })}>
      {hasOld && (
        <div className={styles.oldPrice()}>
          {formatPrice(product.oldPrice!)}{" "}
          <span className={styles.currency()}>{currency}</span>
        </div>
      )}
      <div
        className={`${styles.currentPrice()} ${isPromo ? "text-promotion" : ""}`}
      >
        {formatPrice(product.currentPrice)}{" "}
        <span className={styles.currency()}>{currency}</span>
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
  TopRight,
  Body,
  Title,
  Meta,
  Prices,
  Footer,
};
