import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/client";
import type { ProductListItem } from "@/entities/product/model/ProductListItem.ts";

type SearchResult = {
  items: ProductListItem[];
  totalCount: number;
};

export function useSearchSuggestions(query: string) {
  return useQuery({
    queryKey: ["search-suggestions", query],
    queryFn: () =>
      api<SearchResult>(
        `/api/catalog/products/search?q=${encodeURIComponent(query)}&pageSize=5`,
      ),
    enabled: query.trim().length > 0,
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}
