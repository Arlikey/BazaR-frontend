import type { Product } from "../../../entities/product/model/Product";
import { api } from "../../../shared/api/client";

export function fetchPromoProducts(limit = 6) {
  return api<Product[]>(`/api/products/promo?limit=${limit}`);
}

export function fetchTrendingProducts(limit = 6) {
  return api<Product[]>(`/api/products/trending?limit=${limit}`);
}
