import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/shared/components/ui/Carousel";
import PromoBannerSkeleton from "@/shared/components/ui/loaders/PromoBannerSkeleton";
import type { Promotion } from "@/entities/promotion/model/Promotion";
import { uiText } from "@/shared/config/ui-text";

type Props = {
  promotions: Promotion[];
  isLoading: boolean;
  setApi?: (api: CarouselApi) => void;
  footer?: React.ReactNode;
  variant?: "home" | "category";
};

export function PromoBannersCarousel({
  promotions,
  isLoading,
  footer,
  variant = "category",
  setApi,
}: Props) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <section aria-label={uiText.home.promoBannersAriaLabel}>
      <div
        className={`flex flex-col items-end lg:mx-0 ${variant === "home" ? "gap-5 lg:py-8" : "gap-1 py-4 lg:px-0"}`}
      >
        <Carousel
          setApi={setApi}
          className="w-full lg:px-3"
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onPointerEnter={() => plugin.current.stop()}
          onPointerLeave={() => plugin.current.play()}
        >
          <CarouselContent className="max-h-100 min-h-50">
            {isLoading ? (
              <CarouselItem className="aspect-21/9 max-h-68 pl-0 xl:max-h-100">
                <PromoBannerSkeleton />
              </CarouselItem>
            ) : (
              promotions.map((prom, i) => (
                <CarouselItem key={prom.id} className="pl-0 xl:aspect-21/9">
                  <Link to={"#"} className="block h-full">
                    <img
                      src={prom.imageUrl}
                      alt={prom.name}
                      className="h-full w-full object-contain"
                      loading={i == 0 ? "eager" : "lazy"}
                    />
                  </Link>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <div className="hidden lg:flex">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        {footer}
      </div>
    </section>
  );
}
