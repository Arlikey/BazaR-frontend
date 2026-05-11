import { FavoriteButton } from "@/entities/product/ui/FavoriteButton";
import { CompareIcon } from "@/shared/components/icons/ui/CompareIcon";
import { InfoIcon } from "@/shared/components/icons/ui/InfoIcon";
import Block from "@/shared/components/ui/Block";
import { Button } from "@/shared/components/ui/Button";
import CustomLink from "@/shared/components/ui/CustomLink";
import IconWrapper from "@/shared/components/ui/IconWrapper";
import { isDiscount } from "@/shared/lib/price";

import { CartButton } from "./CartButton";
import type {
  PurchaseBlockProps,
  StockStatus,
} from "@/widgets/product-details/config/purchase-block.config";
const STOCK_LABELS: Record<
  StockStatus,
  { label: string; className: string } | null
> = {
  available: null,
  ending: { label: "Закінчується", className: "text-promotion" },
  unavailable: { label: "Немає в наявності", className: "text-muted" },
};

export function PurchaseBlock({
  productId,
  offerId,
  price,
  oldPrice,
  stockStatus,
  colors,
  activeColor,
  bonusAmount,
  paymentBadges,
  creditAvailable,
  onBuy,
  isCompared,
}: PurchaseBlockProps) {
  const stockLabel = STOCK_LABELS[stockStatus];
  const isAvailable = stockStatus !== "unavailable";
  const hasDiscount = isDiscount(oldPrice, price);

  return (
    <Block
      rounded="xl"
      className="flex flex-col justify-center gap-4 px-4 py-5 md:px-8"
    >
      {colors && colors.length > 0 && (
        <div className="flex items-center gap-4">
          <span className="text-xl">Колір:</span>
          <div className="flex gap-2.5">
            {colors.map((color) => (
              <CustomLink
                key={color.value}
                to={color.to}
                aria-label={color.label}
              >
                <div
                  className={`h-5 w-5 rounded-full transition-shadow ${
                    activeColor === color.value
                      ? "ring-brand ring ring-offset-3"
                      : ""
                  }`}
                  style={{ background: color.value }}
                />
              </CustomLink>
            ))}
          </div>
        </div>
      )}

      <div className="1.5xl:flex-row flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="mr-10 flex flex-col">
            {hasDiscount && oldPrice && (
              <span className="text-muted text-lg line-through">
                {oldPrice.toLocaleString("uk-UA")} ₴
              </span>
            )}
            <span
              className={`text-4xl md:text-5xl ${hasDiscount ? "text-promotion" : ""}`}
            >
              {price.toLocaleString("uk-UA")}
              <span className="text-2xl md:text-4xl">₴</span>
            </span>
            {stockLabel && (
              <span className={`mt-1 text-sm ${stockLabel.className}`}>
                {stockLabel.label}
              </span>
            )}
          </div>

          <div className="1.5xl:hidden flex gap-7.5">
            <FavoriteButton variant="page" productId={productId} />
            <IconWrapper
              className={`h-7.5 cursor-pointer transition-colors ${isCompared ? "text-accent" : "text-subtle"}`}
            >
              <CompareIcon />
            </IconWrapper>
          </div>
        </div>

        {isAvailable && (
          <div className="1.5xl:flex-row 1.5xl:items-center flex flex-col gap-4">
            {/* <Button
              variant="solid"
              rounded="pill"
              color="secondary"
              size="lg"
              className="1.5xl:w-50 h-11 w-full text-base text-white"
              onClick={onBuy}
            >
              Купити
            </Button> */}
            <CartButton offerId={offerId} />
            {creditAvailable && (
              <Button
                variant="solid"
                rounded="pill"
                color="primary"
                size="lg"
                className="1.5xl:w-50 h-11 w-full text-base text-white"
                onClick={onBuy}
              >
                Купити в кредит
              </Button>
            )}

            <div className="1.5xl:flex ml-10 hidden gap-7.5">
              <FavoriteButton variant="page" productId={productId} />
              <IconWrapper
                className={`h-7.5 cursor-pointer transition-colors ${isCompared ? "text-accent" : "text-subtle"}`}
              >
                <CompareIcon />
              </IconWrapper>
            </div>
          </div>
        )}
      </div>

      {(bonusAmount || paymentBadges?.length) && (
        <div className="text-accent flex items-center gap-4">
          {bonusAmount && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                + {bonusAmount.toLocaleString("uk-UA")} бонусних ₴ на рахунок у
                разі купівлі
              </span>
              <button className="hover:text-accent-hover transition-colors">
                <InfoIcon />
              </button>
            </div>
          )}
          {paymentBadges?.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center gap-0.5">
              {badge.icon}
              <span className="text-muted text-xs">{badge.label}</span>
            </div>
          ))}
        </div>
      )}
    </Block>
  );
}
