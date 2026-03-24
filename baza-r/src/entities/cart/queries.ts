import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "./api/cartApi";
import { useAuthStore } from "../../shared/model/auth.store";

export const cartQueryKey = ["cart"] as const;

export function useCart() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: cartQueryKey,
    queryFn: () => cartApi.getCart(),
    enabled: isAuthenticated,
    staleTime: 30_000,
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      offerId,
      quantity,
    }: {
      offerId: string;
      quantity?: number;
    }) => cartApi.addItem(offerId, quantity),
    onSuccess: () => qc.invalidateQueries({ queryKey: cartQueryKey }),
  });
}

export function useUpdateCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      offerId,
      quantity,
    }: {
      offerId: string;
      quantity: number;
    }) => cartApi.updateItem(offerId, quantity),
    onSuccess: () => qc.invalidateQueries({ queryKey: cartQueryKey }),
  });
}

export function useRemoveCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (offerId: string) => cartApi.removeItem(offerId),
    onSuccess: () => qc.invalidateQueries({ queryKey: cartQueryKey }),
  });
}
