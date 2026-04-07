import { usePromotions } from "../../home/promo-banners/model/usePromotions";
import { PromoBannersCarousel } from "../../home/promo-banners/ui/PromoBanners";
import { useCarouselIndex } from "../../home/promo-banners/model/useCarouselIndex";

export function CategoryPromoBanners() {
  const { promotions, isLoading } = usePromotions();
  const carousel = useCarouselIndex();

  return (
    <PromoBannersCarousel
      promotions={promotions}
      isLoading={isLoading}
      setApi={carousel.setApi}
      footer={
        <div className="bw-thin flex items-center justify-center rounded-full border-neutral-100 bg-white px-2.5 py-1 text-sm tabular-nums">
          {carousel.index} / {promotions.length}
        </div>
      }
    />
  );
}
