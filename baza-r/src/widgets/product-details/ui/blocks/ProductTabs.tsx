import { useRef, type HTMLAttributes } from "react";
import CustomLink from "../../../../shared/components/ui/CustomLink";
import { useProductTabs } from "../../hooks/useProductTabs";
import { PRODUCT_TABS } from "../../config/product-tabs.config";
import { CartButton } from "./purchase-block/CartButton";
import { isDiscount } from "../../../../shared/lib/price";
import { FavoriteButton } from "../../../../entities/product/ui/FavoriteButton";
import { useIntersection } from "../../../../shared/hooks/useIntersection";

type Props = HTMLAttributes<HTMLDivElement> & {
  showMiniPurchase?: boolean;
  price?: number;
  oldPrice?: number | null;
  offerId: string;
  productId: string;
};

export function ProductTabs({
  showMiniPurchase,
  price,
  oldPrice,
  offerId,
  productId,
  ...props
}: Props) {
  const productTabsRef = useRef<HTMLDivElement>(null);
  const { activeId } = useProductTabs();
  const hasDiscount = isDiscount(oldPrice, price);
  const tabsSticked = !useIntersection(productTabsRef, {
    threshold: 0.1,
  });

  return (
    <>
      <div ref={productTabsRef} />
      <div
        {...props}
        className={`sticky top-(--top-offset) z-20 flex h-16 items-center justify-between bg-neutral-50 px-4 transition ${tabsSticked && "rounded-b-md bg-white shadow-md"}`}
      >
        <div className="scrollbar-hidden flex gap-x-4 overflow-x-auto lg:gap-x-11">
          {PRODUCT_TABS.map((tab) => (
            <CustomLink
              key={tab.id}
              href={`#${tab.id}`}
              variant="default"
              className={`hover:text-accent shrink-0 pb-2 text-base transition-colors ${
                activeId === tab.id ? "border-b border-current" : ""
              }`}
            >
              {tab.label}
            </CustomLink>
          ))}
        </div>

        {showMiniPurchase && (
          <div className="hidden h-full shrink-0 items-center gap-4 pl-8 lg:flex">
            <div className="flex shrink-0 flex-col">
              {hasDiscount && oldPrice && (
                <span className="text-muted text-sm line-through">
                  {oldPrice.toLocaleString("uk-UA")}₴
                </span>
              )}
              <span
                className={`text-xl font-medium ${hasDiscount ? "text-promotion" : ""}`}
              >
                {price?.toLocaleString("uk-UA")}
                <span className="text-base">₴</span>
              </span>
            </div>

            <FavoriteButton
              productId={productId}
              variant="card"
              className="bg-transparent"
            />

            <CartButton
              rounded="md"
              offerId={offerId}
              className="h-10 w-full max-w-40"
            />
          </div>
        )}
      </div>
    </>
  );
}
