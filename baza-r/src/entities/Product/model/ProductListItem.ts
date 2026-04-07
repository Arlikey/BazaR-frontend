import { API_URL } from "../../../shared/config/env";
import type { Product } from "./Product";

export type ProductListItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  mainImageUrl: string | null;
  offer: {
    id: string;
    priceAmount: number;
    priceCurrency: string;
    oldPriceAmount: number | null;
    stockQuantity: number;
    isFavorite: boolean;
  } | null;
};

export function toProduct(item: ProductListItem, categoryId?: string): Product {
  return {
    id: item.id,
    categoryId,
    name: item.name,
    imageUrl: item.mainImageUrl
      ? `${API_URL}${item.mainImageUrl}`
      : null,
    currentPrice: item.offer?.priceAmount ?? null,
    oldPrice: item.offer?.oldPriceAmount ?? null,
    isActive: true,
    inStock: item.offer?.stockQuantity ?? null,
    rating: null,
    reviewCount: null,
    offerId: item.offer?.id ?? null,
  };
}