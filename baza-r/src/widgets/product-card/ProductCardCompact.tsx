import { Link } from "react-router";
import { uiText } from "@/shared/config/ui-text";
import CustomLink from "@/shared/components/ui/CustomLink";
import type { Product } from "@/entities/product/model/Product";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { FavoriteButton } from "@/entities/product/ui/FavoriteButton";

type CompactProps = {
  product: Product;
  size?: "sm" | "md" | "lg" | undefined;
  className?: string;
  onFavoriteClick?: (p: Product) => void;
};

export function ProductCardCompact({
  product,
  size,
  className,
}: CompactProps) {
  return (
    <ProductCard.Root
      product={product}
      size={size}
      variant="compact"
      className={className}
    >
      <ProductCard.RootRight>
        <FavoriteButton productId={product.id} />
      </ProductCard.RootRight>
      <ProductCard.Top>
        <Link to={`/product/${product.id}`}>
          <ProductCard.Media />
        </Link>
      </ProductCard.Top>

      <ProductCard.Body>
        <CustomLink variant="primary" to={`/product/${product.id}`} className="items-start w-full h-full">
          <ProductCard.Title />
        </CustomLink>
      </ProductCard.Body>

      <ProductCard.Footer>
        <ProductCard.Prices />
        <ProductCard.Meta>
          <span>{product.isAwaited ? uiText.productCard.awaited : ""}</span>
        </ProductCard.Meta>
      </ProductCard.Footer>
    </ProductCard.Root>
  );
}
