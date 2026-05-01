import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "./api/cartApi";
import { useAuthStore } from "@/shared/model/auth.store";
import type { Cart } from "./model/cart";
import { EMPTY_CART } from "./model/emptyCart";

export const cartQueryKey = ["cart"] as const;

export function useCart() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: cartQueryKey,
    queryFn: () => cartApi.getCart(),
    enabled: isAuthenticated,
    staleTime: 30_000,
    placeholderData: EMPTY_CART,
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

    onMutate: async ({ offerId, quantity }) => {
      await qc.cancelQueries({ queryKey: cartQueryKey });
      const previous = qc.getQueryData<Cart>(cartQueryKey);
      qc.setQueryData<Cart>(cartQueryKey, (old) => {
        if (!old) return old;
        const existingItem = old.items.find((item) => item.offerId === offerId);
        if (existingItem) {
          return {
            ...old,
            items: old.items.map((item) =>
              item.offerId === offerId
                ? { ...item, quantity: item.quantity + (quantity ?? 1) }
                : item,
            ),
          };
        }
        return old;
      });
      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      qc.setQueryData(cartQueryKey, ctx?.previous);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: cartQueryKey });
    },
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

    onMutate: async ({ offerId, quantity }) => {
      await qc.cancelQueries({ queryKey: cartQueryKey });

      const previous = qc.getQueryData<Cart>(cartQueryKey);

      qc.setQueryData<Cart>(cartQueryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.map((item) =>
            item.offerId === offerId ? { ...item, quantity } : item,
          ),
        };
      });

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      qc.setQueryData(cartQueryKey, ctx?.previous);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: cartQueryKey });
    },
  });
}

export function useRemoveCartItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (offerId: string) => cartApi.removeItem(offerId),
    onMutate: async (offerId) => {
      await qc.cancelQueries({ queryKey: cartQueryKey });
      const previous = qc.getQueryData<Cart>(cartQueryKey);
      qc.setQueryData<Cart>(cartQueryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.filter((item) => item.offerId !== offerId),
        };
      });

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      qc.setQueryData(cartQueryKey, ctx?.previous);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: cartQueryKey });
    },
  });
}
