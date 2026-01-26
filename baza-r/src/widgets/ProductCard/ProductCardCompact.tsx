import type { Product } from "../../entities/Product/model/Product";
import { ProductCard } from "../../entities/Product/ui/ProductCard";
import FavouriteIcon from "../../shared/components/icons/ui/FavouriteIcon";
import Button from "../../shared/components/ui/Button";

type CompactProps = {
  product: Product;
  onFavouriteClick?: (p: Product) => void;
};

export function ProductCardCompact({
  product,
  onFavouriteClick,
}: CompactProps) {
  return (
    <ProductCard.Root product={product} variant="compact">
      <ProductCard.Top>
        <ProductCard.Media />
        <ProductCard.TopRight>
          <Button
            className="hover:bg-hover-light-primary/15 overflow-hidden bg-white"
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
