import type { Product } from "../../entities/product/model/Product";
import { ProductCard } from "../../entities/product/ui/ProductCard";
import FavouriteIcon from "../../shared/components/icons/ui/FavouriteIcon";
import Button from "../../shared/components/ui/Button";

type CompactProps = {
  product: Product;
  className?: string;
  onFavouriteClick?: (p: Product) => void;
};

export function ProductCardCompact({
  product,
  className,
  onFavouriteClick,
}: CompactProps) {
  return (
    <ProductCard.Root product={product} variant="compact" className={className}>
      <ProductCard.Top>
        <ProductCard.Media />
        <ProductCard.TopRight>
          <Button
            className="hover:bg-hover-light-primary/15 overflow-hidden bg-white text-subtle"
            shape="icon"
            aria-label="Add to favourites"
            onClick={() => onFavouriteClick?.(product)}
          >
            <FavouriteIcon size="25" />
          </Button>
        </ProductCard.TopRight>
      </ProductCard.Top>

      <ProductCard.Body>
        <ProductCard.Title />
      </ProductCard.Body>

      <ProductCard.Footer>
        <ProductCard.Prices />
      </ProductCard.Footer>
    </ProductCard.Root>
  );
}
