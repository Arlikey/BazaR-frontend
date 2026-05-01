import { api } from "@/shared/api/client";
import type { ProductListItem } from "../../product/model/ProductListItem";

export const favoritesApi = {
  getAll: () => api<ProductListItem[]>("/api/customer/favorites"),
  add: async (productId: string) =>
    api(`/api/customer/favorites/${productId}`, { method: "PUT" }),
  remove: (productId: string) =>
    api(`/api/customer/favorites/${productId}`, { method: "DELETE" }),
};
