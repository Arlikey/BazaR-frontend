import type { ListOffer } from "../../offer/model/offer";
import type { Product } from "./Product";

export type ProductListItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  mainImageUrl: string | null;
  ratingAverage: number | null;
  reviewsCount: number | null;
  offer: ListOffer | null;
};

export function toProduct(item: ProductListItem, categoryId?: string): Product {
  return {
    id: item.id,
    categoryId,
    name: item.name,
    imageUrl: item.mainImageUrl,
    currentPrice: item.offer?.priceAmount ?? null,
    oldPrice: item.offer?.oldPriceAmount ?? null,
    currency: item.offer?.priceCurrency ?? null,
    isActive: true,
    inStock: item.offer?.stockQuantity ?? null,
    rating: item.ratingAverage,
    reviewCount: item.reviewsCount,
    offerId: item.offer?.id ?? null,
  };
}
