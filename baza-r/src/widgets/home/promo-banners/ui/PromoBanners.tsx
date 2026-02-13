import React, { useEffect, useState } from "react";

import { tryCatch } from "../../../../shared/lib/try-catch";
import CustomLink from "../../../../shared/components/ui/CustomLink";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../../../shared/components/ui/Carousel";
import PromotionDao from "../../../../entities/promotion/api/__mocks__/PromotionDao";
import type { Promotion } from "../../../../entities/promotion/model/Promotion";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router";
import PromoBannerSkeleton from "../../../../shared/components/ui/loaders/PromoBannerSkeleton";

export function PromoBanners() {
  const [data, setData] = useState<Promotion[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const total = data.length;

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const [items, err] = await tryCatch(PromotionDao.getPromotions());
      if (err) setError(err);
      else setData(items ?? []);
      setIsLoading(false);
    };
    load();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <section aria-label="Промо-банери">
      <div className="flex flex-col items-end gap-5">
        <Carousel
          className="w-full px-3"
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onPointerEnter={() => plugin.current.stop()}
          onPointerLeave={() => plugin.current.play()}
        >
          <CarouselContent className="max-h-400">
            {isLoading ? (
              <CarouselItem className="pl-0">
                <PromoBannerSkeleton />
              </CarouselItem>
            ) : (
              data.map((prom) => (
                <CarouselItem key={prom.id} className="pl-0">
                  <Link to={prom.url} className="block h-full">
                    <img
                      src={prom.imageUrl}
                      alt={prom.name}
                      className="h-full w-full object-contain"
                    />
                  </Link>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <CustomLink
          to={""}
          variant="primary"
          border="thin"
          className="group h-11 gap-1 px-15 text-sm"
        >
          Всі акції
          <span className="group-hover:text-accent text-neutral-500 transition">
            {total}
          </span>
        </CustomLink>
      </div>
    </section>
  );
}
