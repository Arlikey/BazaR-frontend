import Block from "../../../../shared/components/ui/Block";

type Props = {
  src: string;
  alt: string;
  onClick: () => void;
};

export function GalleryMainImage({ src, alt, onClick }: Props) {
  return (
    <Block
      rounded="xl"
      className="flex h-[538px] w-full flex-1 cursor-zoom-in items-center justify-center overflow-hidden"
      onClick={onClick}
    >
      <img
        src={`/images/products/original/${src}.png`}
        alt={alt}
        className="h-full w-full object-contain p-6"
      />
    </Block>
  );
}
