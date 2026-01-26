import type { ReactNode } from "react";
import type { Product } from "../../entities/Product/model/Product";
import { ProductCard } from "../../entities/Product/ui/ProductCard";
import Button from "../../shared/components/ui/Button";
import FavouriteIcon from "../../shared/components/icons/ui/FavouriteIcon";

type RichProps = {
  product: Product;
  badge?: ReactNode; // “АКЦІЯ”
  compare?: ReactNode; // иконка сравнения
  availability?: ReactNode; // “Закінчується”
  rating?: ReactNode; // звезды + отзывы
  colors?: ReactNode; // выбор цветов
  buy?: ReactNode; // корзина/купить
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
        <ProductCard.TopRight>
          <Button
            className="hover:bg-hover-light-primary/15 overflow-hidden bg-white"
            shape="icon"
            aria-label="Add to favourites"
            onClick={() => onFavouriteClick?.(product)}
          >
            <FavouriteIcon size="25" />
          </Button>
          {compare}
        </ProductCard.TopRight>
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
