import type { ReactNode } from "react";
import type { Product } from "../../entities/product/model/Product";
import { ProductCard } from "../../entities/product/ui/ProductCard";
import { Button } from "../../shared/components/ui/Button";
import FavouriteIcon from "../../shared/components/icons/ui/FavouriteIcon";
import { uiText } from "../../shared/config/ui-text";

type RichProps = {
  product: Product;
  badge?: ReactNode;
  compare?: ReactNode;
  availability?: ReactNode;
  rating?: ReactNode;
  colors?: ReactNode;
  buy?: ReactNode;
  onFavouriteClick?: (p: Product) => void;
};

export function ProductCardRich({
  product,
  badge,
  compare,
  availability,
  rating,
  colors,
  buy,
  onFavouriteClick,
}: RichProps) {
  return (
    <ProductCard.Root product={product} variant="rich">
      <ProductCard.Top>
        <ProductCard.Media />
        {badge && <ProductCard.TopLeft>{badge}</ProductCard.TopLeft>}
        <ProductCard.RootRight>
          <Button
            className="hover:bg-subtle/15 bg-surface overflow-hidden"
             
            aria-label={uiText.productCard.favouriteAriaLabel}
            onClick={() => onFavouriteClick?.(product)}
          >
            <FavouriteIcon />
          </Button>
          {compare}
        </ProductCard.RootRight>
      </ProductCard.Top>

      <ProductCard.Body>
        <ProductCard.Title />
        {(rating || colors) && (
          <ProductCard.Meta>
            {rating}
            {colors}
          </ProductCard.Meta>
        )}
      </ProductCard.Body>

      <ProductCard.Footer>
        <ProductCard.Prices />
        {(availability || buy) && (
          <>
            <div className="min-w-0">{availability}</div>
            <div className="shrink-0">{buy}</div>
          </>
        )}
      </ProductCard.Footer>
    </ProductCard.Root>
  );
}
