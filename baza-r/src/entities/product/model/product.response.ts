import type { ProductListItem } from "./ProductListItem";

export type ProductsResponse = {
  items: ProductListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
};
