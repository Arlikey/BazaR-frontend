import { useEffect, useMemo, useState } from "react";
import { tryCatch } from "../../../shared/lib/try-catch";
import CategoryDao from "../../../entities/category/api/__mocks__/CategoryDao";
import type { Category } from "../../../entities/category/model/Category";
import { buildCategoryTree } from "../../../entities/category/model/buildCategoryTree";
import type { CategoryNode } from "../../../entities/category/model/tree";

export function useCatalogCategories() {
  const [flat, setFlat] = useState<Category[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const [data, err] = await tryCatch(CategoryDao.getCategories());
      if (err) setError(err);
      else if (data) setFlat(data);
      setIsLoading(false);
    };
    load();
  }, []);

  const tree: CategoryNode[] = useMemo(() => buildCategoryTree(flat), [flat]);
  const roots: CategoryNode[] = tree;

  return { flat, roots, tree, error, isLoading };
}
