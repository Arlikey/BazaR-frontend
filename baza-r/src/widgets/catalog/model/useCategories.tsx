import { useMemo } from "react";
import { categoryApi } from "@/entities/category/api/categoryApi";
import { buildCategoryTree } from "@/entities/category/model/buildCategoryTree";
import { useQuery } from "@tanstack/react-query";

export function useCatalogCategories() {
  const {
    data: flat = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getAll(),
    staleTime: 5 * 60 * 1000,
  });

  const tree = useMemo(() => buildCategoryTree(flat), [flat]);
  return { flat, tree, roots: tree, error, isLoading };
}
