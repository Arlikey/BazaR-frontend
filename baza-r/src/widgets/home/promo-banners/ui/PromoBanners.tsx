import React, { useEffect, useState } from "react";

import CustomLink from "../../../../shared/components/ui/CustomLink";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../shared/components/ui/Carousel";
import PromotionDao from "../../../../entities/promotion/api/__mocks__/PromotionDao";
import type { Promotion } from "../../../../entities/promotion/model/Promotion";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router";
import PromoBannerSkeleton from "../../../../shared/components/ui/loaders/PromoBannerSkeleton";
import { uiText } from "../../../../shared/config/ui-text";

export function PromoBanners() {
  const [data, setData] = useState<Promotion[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const total = data.length;

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const items = await PromotionDao.getPromotions();

      setData(items);
      setIsLoading(false);
    };
    load();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <section aria-label={uiText.home.promoBannersAriaLabel}>
      <div className="-mx-8 flex flex-col items-end gap-5 lg:mx-0 lg:py-8">
        <Carousel
          className="w-full lg:px-3"
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onPointerEnter={() => plugin.current.stop()}
          onPointerLeave={() => plugin.current.play()}
        >
          <CarouselContent className="max-h-100">
            {isLoading ? (
              <CarouselItem className="aspect-21/9 max-h-68 pl-0 xl:max-h-100">
                <PromoBannerSkeleton />
              </CarouselItem>
            ) : (
              data.map((prom, i) => (
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
        <CustomLink
          to={""}
          variant="primary"
          border="thin"
          className="group h-11 gap-1 px-15 text-sm"
        >
          {uiText.home.allPromotions}
          <span className="group-hover:text-accent text-neutral-500 transition">
            {total}
          </span>
        </CustomLink>
      </div>
    </section>
  );
}
