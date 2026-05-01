import { api } from "@/shared/api/client";
import type { OfferResponse } from "../../offer/model/offer.response";
import type { ProductFilterResponse } from "../model/Product";
import type { ProductsResponse } from "../model/product.response";
import type { ProductAttributesView } from "../model/ProductAttributeView";
import type { ProductDetails } from "../model/ProductDetails";
import type { ProductFilterRequest } from "../model/ProductFilterRequest";
import type { ProductListItem } from "../model/ProductListItem.ts";

export const productApi = {
  getById: (id: string) => api<ProductDetails>(`/api/catalog/products/${id}`),

  getAttributes: (productId: string) =>
    api<ProductAttributesView>(
      `/api/catalog/products/${productId}/attributes-view`,
    ),

  getOffer: (productId: string) =>
    api<OfferResponse>(`/api/catalog/offers/by-product/${productId}`),

  getByCategory: (categoryId: string) =>
    api<ProductListItem[]>(`/api/catalog/products/category/${categoryId}`),
  filterProducts: (categoryId: string, body: ProductFilterRequest) =>
    api<ProductFilterResponse>(
      `/api/catalog/categories/${categoryId}/products/filter`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    ),

  getRecentlyViewed: () => api<ProductsResponse>(`/api/customer/me/viewed`),
};
