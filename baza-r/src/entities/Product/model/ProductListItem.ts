import type { Product } from "./Product";

export type ProductListItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  mainImageUrl: string | null;
  offer: {
    productId: string;
    priceAmount: number;
    priceCurrency: string;
    oldPriceAmount: number | null;
    inStock: boolean;
  } | null;
};

export function toProduct(item: ProductListItem, categoryId: string): Product {
  return {
    id: item.id,
    categoryId,
    name: item.name,
    imageUrl: item.mainImageUrl
      ? `http://localhost:8080${item.mainImageUrl}`
      : null,
    currentPrice: item.offer?.priceAmount ?? null,
    oldPrice: item.offer?.oldPriceAmount ?? null,
    isActive: true,
    inStock: item.offer?.inStock ?? null,
    rating: null,
    reviewCount: null,
  };
}