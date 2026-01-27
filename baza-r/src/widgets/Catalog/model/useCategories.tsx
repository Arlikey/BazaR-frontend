import { useEffect, useState } from "react";
import { tryCatch } from "../../../shared/lib/try-catch";
import CategoryDao from "../../../entities/category/api/__mocks__/CategoryDao";
import type { Category } from "../../../entities/category/model/Category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);

      const [data, err] = await tryCatch(CategoryDao.getCategories());

      if (err) setError(err);
      else if (data) setCategories(data);

      setIsLoading(false);
    };

    load();
    return () => {};
  }, []);

  return { categories, error, isLoading };
}
