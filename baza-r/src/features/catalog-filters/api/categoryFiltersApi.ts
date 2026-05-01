import { api } from "../../../shared/api/client";
import type { CategorySidebarResponse } from "../model/CategorySidebarResponse";

export const categoryFiltersApi = {
  getSidebar: (categoryId: string) =>
    api<CategorySidebarResponse>(
      `/api/catalog/categories/${categoryId}/sidebar`,
    ),
};
