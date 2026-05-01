import { api } from "../../../shared/api/client";
import { mapCategory } from "../model/map";
import type { CategoryDto } from "./CategoryDto";

export const categoryApi = {
  getAll: async () => {
    const data = await api<CategoryDto[]>("/api/catalog/categories");
    return data.map(mapCategory);
  },
};
