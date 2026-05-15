import { useQuery } from "@tanstack/react-query";
import type { ProductListItem } from "@/entities/product/model/ProductListItem";
import { api } from "@/shared/api/client";

type SearchResult = {
  items: ProductListItem[];
  totalCount: number;
};

export function useSearchProducts(
  query: string,
  page: number,
  pageSize: number,
) {
  return useQuery({
    queryKey: ["search-products", query, page],
    queryFn: () =>
      api<SearchResult>(
        `/api/catalog/products/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`,
      ),
    enabled: query.trim().length > 0,
    placeholderData: (prev) => prev,
  });
}
