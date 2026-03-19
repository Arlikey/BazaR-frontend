import { api } from "../../../shared/api/client";
import type { ProductAttributesView } from "../model/ProductAttributeView";
import type { ProductDetails } from "../model/ProductDetails";
import type { ProductListItem } from "../model/ProductListItem";
import type { ProductOffer } from "../model/ProductOffer";

export const productApi = {
  getById: (id: string) => api<ProductDetails>(`/api/catalog/products/${id}`),

  getAttributes: (productId: string) =>
    api<ProductAttributesView>(
      `/api/catalog/products/${productId}/attributes-view`,
    ),

  getOffer: (productId: string) =>
    api<ProductOffer>(`/api/catalog/offers/by-product/${productId}`),

  getByCategory: (categoryId: string) =>
    api<ProductListItem[]>(`/api/catalog/products/category/${categoryId}`),
};
