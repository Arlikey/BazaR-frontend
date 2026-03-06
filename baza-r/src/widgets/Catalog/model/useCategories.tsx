import { useEffect, useMemo, useState } from "react";
import { tryCatch } from "../../../shared/lib/try-catch";
import CategoryDao from "../../../entities/category/api/__mocks__/CategoryDao";
import type { Category } from "../../../entities/category/model/Category";
import { buildCategoryTree } from "../../../entities/category/model/buildCategoryTree";
import type { CategoryNode } from "../../../entities/category/model/tree";
import { useQuery } from "@tanstack/react-query";

export function useCatalogCategories() {
  const {
    data: flat = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryDao.getCategories(),
    staleTime: 5 * 60 * 1000,
  });

  const tree = useMemo(() => buildCategoryTree(flat), [flat]);

  return { flat, tree, roots: tree, error, isLoading };
}
