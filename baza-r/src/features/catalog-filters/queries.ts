import { useQuery } from "@tanstack/react-query";
import { categoryFiltersApi } from "./api/categoryFiltersApi";

export function useCategorySidebar(categoryId: string) {
  return useQuery({
    queryKey: ["category-sidebar", categoryId],
    queryFn: () => categoryFiltersApi.getSidebar(categoryId),
  });
}
