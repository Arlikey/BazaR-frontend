import { useQuery } from "@tanstack/react-query";
import { productApi } from "./api/productApi";
import type { CatalogFilters } from "@/features/catalog-filters/model/catalogFilters";
import { buildFilterRequest } from "@/features/catalog-filters/model/buildFilterRequest";

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getById(id!),
    enabled: !!id,
  });
}

export function useProductAttributes(id: string | undefined) {
  return useQuery({
    queryKey: ["product-attributes", id],
    queryFn: () => productApi.getAttributes(id!),
    enabled: !!id,
  });
}

export function useProductOffer(productId: string | undefined) {
  return useQuery({
    queryKey: ["product-offer", productId],
    queryFn: () => productApi.getOffer(productId!),
    enabled: !!productId,
  });
}

export function useProductsByCategory(categoryId: string | undefined) {
  return useQuery({
    queryKey: ["products-category", categoryId],
    queryFn: () => productApi.getByCategory(categoryId!),
    enabled: !!categoryId,
  });
}

export function useFilteredProducts(
  categoryId: string,
  filters: CatalogFilters,
) {
  const body = buildFilterRequest(filters);
  console.log(body);
  return useQuery({
    queryKey: ["products", categoryId, body],
    queryFn: () => productApi.filterProducts(categoryId, body),
    enabled: !!categoryId,
    placeholderData: (prev) => prev,
  });
}

export function useRecentlyViewedProducts() {
  return useQuery({
    queryKey: ["recently-viewed-products"],
    queryFn: () => productApi.getRecentlyViewed(),
    enabled: true,
    placeholderData: (prev) => prev,
  });
}
