import { useState, useCallback } from "react";
import { GalleryThumbnails } from "./GalleryThumbnails";
import { GalleryMainImage } from "./GalleryMainImage";
import { GallerySkeleton } from "@/shared/components/ui/loaders/GallerySkeleten";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/components/ui/Carousel";
import Block from "@/shared/components/ui/Block";
import placeholder from "@/shared/assets/images/placeholder.webp";

type Props = {
  images?: string[];
  alt?: string;
  isLoading?: boolean;
};

export function ProductGallery({ images = [], alt = "", isLoading }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const handleApiChange = useCallback((newApi: CarouselApi) => {
    setApi(newApi);
    newApi?.on("select", () => {
      setActiveIndex(newApi.selectedScrollSnap());
    });
  }, []);

  const handleThumbnailSelect = (index: number) => {
    setActiveIndex(index);
    api?.scrollTo(index);
  };

  if (isLoading) return <GallerySkeleton />;

  const srcs = images.length > 0 ? images : [placeholder];

  return (
    <div className="flex min-w-0 flex-row gap-5">
      <GalleryThumbnails
        images={images}
        activeIndex={activeIndex}
        onSelect={handleThumbnailSelect}
      />

      <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3">
        <Carousel
          setApi={handleApiChange}
          opts={{ loop: false }}
          className="w-full"
        >
          <Block rounded="xl" className="flex h-80 overflow-hidden md:h-134.5">
            <CarouselContent className="h-full">
              {srcs.map((src, i) => (
                <CarouselItem
                  key={i}
                  className="flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-contain p-4 md:p-6"
                    fetchPriority={i === 0 ? "high" : "auto"}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Block>
        </Carousel>

        {srcs.length > 1 && (
          <div className="flex justify-center gap-1.5 xl:hidden">
            {srcs.map((_, i) => (
              <button
                key={i}
                onClick={() => handleThumbnailSelect(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-accent w-4" : "w-1.5 bg-neutral-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
