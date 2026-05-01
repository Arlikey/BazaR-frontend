import type { ProductListItem } from "./ProductListItem.ts";

export type ProductsResponse = {
  items: ProductListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
};
