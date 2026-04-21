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
  imageUrl?: string | null;
};

export const categoryApi = {
  getAll: () => api<CategoryDto[]>("/api/catalog/categories"),

  create: (data: {
    name: string;
    slug: string;
    parentCategoryId: string | null;
    sortOrder: number;
  }) =>
    api<{ id: string }>("/api/admin/catalog/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  uploadImage: (id: string, file: File) => {
    const form = new FormData();
    form.append("file", file);
    return api(`/api/admin/catalog/categories/${id}/image`, {
      method: "POST",
      body: form,
    });
  },

  deleteImage: (id: string) =>
    api(`/api/admin/catalog/categories/${id}/image`, {
      method: "DELETE",
    }),
};
