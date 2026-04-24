import { API_URL } from "../../../shared/config/env";
import type { ListOffer } from "../../offer/model/offer";
import type { Product } from "./Product";

export type ProductListItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  mainImageUrl: string | null;
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
    rating: null,
    reviewCount: null,
    offerId: item.offer?.id ?? null,
  };
}
