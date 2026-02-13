import type { Product } from "../../entities/product/model/Product";
import { ProductCard } from "../../entities/product/ui/ProductCard";
import FavouriteIcon from "../../shared/components/icons/ui/FavouriteIcon";
import { Button } from "../../shared/components/ui/Button";
import IconWrapper from "../../shared/components/ui/IconWrapper";

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
            rounded="md"
            className="hover:bg-subtle/15 bg-surface text-subtle h-10 w-10"
            aria-label="Add to favourites"
            onClick={() => onFavouriteClick?.(product)}
          >
            <IconWrapper>
              <FavouriteIcon />
            </IconWrapper>
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
