import { useQuery } from "@tanstack/react-query";
import { productApi } from "./api/productApi";

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