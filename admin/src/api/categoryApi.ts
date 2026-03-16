import { api } from "./client";

export type Category = {
  id: string;
  name: string;
  parentCategoryId: string | null;
  sortOrder: number;
};

export type CategoryDto = {
  id: string;
  name: string;
  parentCategoryId: string | null;
  sortOrder: number;
};

export const categoryApi = {
  getAll: () => api<CategoryDto[]>("/api/catalog/categories"),
  create: (data: {
    name: string;
    parentCategoryId: string | null;
    sortOrder: number;
  }) =>
    api("/api/admin/catalog/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (
    id: string,
    data: { name: string; parentCategoryId: string | null; sortOrder: number },
  ) =>
    api(`/api/admin/catalog/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    api(`/api/admin/catalog/categories/${id}`, { method: "DELETE" }),
};
