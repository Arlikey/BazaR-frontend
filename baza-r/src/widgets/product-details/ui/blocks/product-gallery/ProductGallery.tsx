import { useState } from "react";
import { GalleryThumbnails } from "./GalleryThumbnails";
import { GalleryMainImage } from "./GalleryMainImage";
import { GallerySkeleton } from "../../../../../shared/components/ui/loaders/GallerySkeleten";

type Props = {
  images?: string[];
  alt?: string;
  isLoading?: boolean;
};

export function ProductGallery({ images, alt = "", isLoading }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading || !images?.length) return <GallerySkeleton />;

  return (
    <div className="flex flex-col-reverse gap-5 lg:flex-row">
      <GalleryThumbnails
        images={images}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
      <GalleryMainImage src={images[activeIndex]} alt={alt} />
    </div>
  );
}
