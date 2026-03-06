import { Link } from "react-router";
import type { Product } from "../../entities/product/model/Product";
import { ProductCard } from "../../entities/product/ui/ProductCard";
import { FavouriteIcon } from "../../shared/components/icons/ui/FavouriteIcon";
import { Button } from "../../shared/components/ui/Button";
import IconWrapper from "../../shared/components/ui/IconWrapper";
import { uiText } from "../../shared/config/ui-text";
import CustomLink from "../../shared/components/ui/CustomLink";

type CompactProps = {
  product: Product;
  size?: "sm" | "md" | "lg" | undefined;
  className?: string;
  onFavouriteClick?: (p: Product) => void;
};

export function ProductCardCompact({
  product,
  size,
  className,
  onFavouriteClick,
}: CompactProps) {
  return (
    <ProductCard.Root
      product={product}
      size={size}
      variant="compact"
      className={className}
    >
      <ProductCard.RootRight>
        <Button
          rounded="md"
          className="hover:bg-subtle/15 bg-surface text-subtle h-10 w-10"
          aria-label={uiText.productCard.favouriteAriaLabel}
          onClick={() => onFavouriteClick?.(product)}
        >
          <IconWrapper className={`${size === "lg" ? "h-6.5 w-7.5" : ""}`}>
            <FavouriteIcon />
          </IconWrapper>
        </Button>
      </ProductCard.RootRight>
      <ProductCard.Top>
        <Link to={`/product/${product.id}`}>
          <ProductCard.Media />
        </Link>
      </ProductCard.Top>

      <ProductCard.Body>
        <CustomLink variant="primary" to={`/product/${product.id}`}>
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
