import { useQuery } from "@tanstack/react-query";
import type { ProductListItem } from "@/entities/product/model/ProductListItem";
import { api } from "@/shared/api/client";

type SearchResult = {
  items: ProductListItem[];
  totalCount: number;
};

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ["search-products", query],
    queryFn: () =>
      api<SearchResult>(
        `/api/catalog/products/search?q=${encodeURIComponent(query)}&page=1&pageSize=20`,
      ),
    enabled: query.trim().length > 0,
  });
}
