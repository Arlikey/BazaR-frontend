import { Link } from "react-router";
import { ProductCard } from "../../entities/product/ui/ProductCard";
import type { Product } from "../../entities/product/model/Product";
import { CompareButton } from "../../entities/product/ui/CompareButton";
import { CartButton } from "../../entities/product/ui/CartButton";
import { StockStatus } from "../../entities/product/ui/StockStatus";
import { ProductBadge } from "../../entities/product/ui/ProductBadge";
import IconWrapper from "../../shared/components/ui/IconWrapper";
import { DialogueIcon } from "../../shared/components/icons/ui/DialogueIcon";
import CustomLink from "../../shared/components/ui/CustomLink";
import {
  calcDiscount,
  getStockStatus,
} from "../../entities/product/model/productUtils";
import { FavoriteButton } from "../../entities/product/ui/FavoriteButton";
import { StarRating } from "../product-details/ui/blocks/reviews-section/StarRating";

type Props = { product: Product };

export function ProductCardRich({ product }: Props) {
  const isPromo =
    product.oldPrice != null &&
    product.currentPrice != null &&
    product.oldPrice > product.currentPrice;

  const discount = isPromo
    ? calcDiscount(product.currentPrice!, product.oldPrice!)
    : null;

  const inStock = getStockStatus(product.inStock);

  return (
    <ProductCard.Root
      product={product}
      variant="rich"
      disabled={inStock === "unavailable"}
    >
      <ProductCard.Top>
        <Link to={`/product/${product.id}`}>
          <ProductCard.Media />
        </Link>

        {discount != null && discount >= 1 && (
          <ProductCard.TopLeft>
            <ProductBadge variant="discount" value={discount} />
          </ProductCard.TopLeft>
        )}

        <ProductCard.RootRight>
          <FavoriteButton productId={product.id} />
          <CompareButton />
        </ProductCard.RootRight>
      </ProductCard.Top>

      <ProductCard.Body>
        <CustomLink variant="primary" to={`/product/${product.id}`} className="w-full">
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
          {inStock !== "unavailable" && product.offerId && (
            <CartButton offerId={product.offerId} />
          )}
        </div>
        <StockStatus inStock={product.inStock} />
      </ProductCard.Footer>
    </ProductCard.Root>
  );
}
