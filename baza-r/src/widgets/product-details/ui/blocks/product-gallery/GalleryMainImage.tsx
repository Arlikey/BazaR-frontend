import Block from "../../../../../shared/components/ui/Block";
import placeholder from "../../../../../shared/assets/images/placeholder.webp";

type Props = {
  src: string;
  alt: string;
  onClick?: () => void;
};

export function GalleryMainImage({ src, alt, onClick }: Props) {
  return (
    <Block
      rounded="xl"
      className="flex h-134.5 w-full flex-1 cursor-zoom-in items-center justify-center overflow-hidden"
      onClick={onClick}
    >
      <img
        src={src ?? placeholder}
        alt={alt}
        className="h-full w-full object-contain p-6"
        fetchPriority="high"
      />
    </Block>
  );
}
