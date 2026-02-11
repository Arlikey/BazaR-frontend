import { useQuery } from "@tanstack/react-query";
import { fetchPromoProducts, fetchTrendingProducts } from "../api/productsApi";
import ProductDao from "../../../entities/product/api/__mocks__/ProductDao";

export function useTrendingProducts(limit = 6) {
    return ProductDao.getTrendingProducts();
//   return useQuery({
//     queryKey: ["products", "promo", { limit }],
//     queryFn: () => fetchPromoProducts(limit),
//     staleTime: 60_000,
//   });
}

export function usePromoProducts(limit = 6) {
  return useQuery({
    queryKey: ["products", "trending", { limit }],
    queryFn: () => fetchTrendingProducts(limit),
    staleTime: 60_000,
  });
}
