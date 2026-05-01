import { useState, useEffect } from "react";
import type { CarouselApi } from "@/shared/components/ui/Carousel";

export function useCarouselIndex() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setIndex(api.selectedScrollSnap() + 1);
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return { api, setApi, index };
}
