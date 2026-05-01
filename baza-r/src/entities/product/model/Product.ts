import type { ProductListItem } from "./ProductListItem.ts";

export type Product = {
  id: string;
  categoryId?: string;
  name: string;
  imageUrl: string | null;
  oldPrice: number | null;
  currentPrice: number | null;
  currency: string | null;
  isActive: boolean;
  isAwaited?: boolean | null;
  inStock?: number | null;
  rating?: number | null;
  reviewCount?: number | null;
  offerId?: string | null;
};

export type ProductFilterResponse = {
  items: ProductListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
};
