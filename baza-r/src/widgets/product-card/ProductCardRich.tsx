import { Link } from "react-router";
import { ProductCard } from "../../entities/product/ui/ProductCard";
import type { Product } from "../../entities/product/model/Product";
import { FavouriteButton } from "../../entities/product/ui/FavouriteButton";
import { CompareButton } from "../../entities/product/ui/CompareButton";
import { CartButton } from "../../entities/product/ui/CartButton";
import { StockStatus } from "../../entities/product/ui/StockStatus";
import { ProductBadge } from "../../entities/product/ui/ProductBadge";
import { StarRating } from "../product-details/ui/blocks/review-block/ReviewCard";
import IconWrapper from "../../shared/components/ui/IconWrapper";
import { DialogueIcon } from "../../shared/components/icons/ui/DialogueIcon";
import CustomLink from "../../shared/components/ui/CustomLink";

type Props = { product: Product };

export function ProductCardRich({ product }: Props) {
  const isPromo =
    product.oldPrice != null &&
    product.currentPrice != null &&
    product.oldPrice > product.currentPrice;

  const discount = isPromo
    ? Math.round((1 - product.currentPrice! / product.oldPrice!) * 100)
    : null;

  return (
    <ProductCard.Root product={product} variant="rich">
      <ProductCard.Top>
        <Link to={`/product/${product.id}`}>
          <ProductCard.Media />
        </Link>

        {discount ? (
          <ProductCard.TopLeft>
            <ProductBadge variant="discount" value={discount} />
          </ProductCard.TopLeft>
        ) : (
          <ProductCard.TopLeft>
            <ProductBadge variant="exclusive" />
          </ProductCard.TopLeft>
        )}

        <ProductCard.RootRight>
          <FavouriteButton productId={product.id} />
          <CompareButton productId={product.id} />
        </ProductCard.RootRight>
      </ProductCard.Top>

      <ProductCard.Body>
        <CustomLink variant="primary" to={`/product/${product.id}`}>
          <ProductCard.Title />
        </CustomLink>
        <ProductCard.Meta>
          {product.reviewCount != null && product.reviewCount > 0 ? (
            <StarRating rating={product.rating ?? 0} />
          ) : (
            <CustomLink to={""} variant="primary" className="gap-1">
              <IconWrapper size={13}>
                <DialogueIcon />
              </IconWrapper>
              Залишити відгук
            </CustomLink>
          )}
        </ProductCard.Meta>
      </ProductCard.Body>

      <ProductCard.Footer>
        <div className="flex items-end justify-between gap-2">
          <ProductCard.Prices />
          {product.inStock && <CartButton productId={product.id} />}
        </div>
        <StockStatus inStock={product.inStock} />
      </ProductCard.Footer>
    </ProductCard.Root>
  );
}
