import Block from "../../../../../shared/components/ui/Block";

type Props = {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function GalleryThumbnails({ images, activeIndex, onSelect }: Props) {
  return (
    <div className="flex gap-6.25 overflow-x-auto lg:max-h-134.5 lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto">
      {images.map((src, i) => (
        <button key={src} onClick={() => onSelect(i)} className="shrink-0">
          <Block
            rounded="md"
            className={`h-21.75 w-31.25 overflow-hidden ${
              activeIndex === i ? "border-accent!" : ""
            }`}
          >
            <img
              src={`/images/products/thumbs/${src}_thumb.png`}
              alt=""
              className="h-full w-full object-contain p-2"
            />
          </Block>
        </button>
      ))}
    </div>
  );
}
