import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/model/auth.store";
import { favoritesApi } from "./api/favoriteApi";

export const favoritesQueryKey = ["favorites"] as const;

export function useFavorites() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: favoritesQueryKey,
    queryFn: () => favoritesApi.getAll(),
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();
  const favorites = qc.getQueryData<{ id: string }[]>(favoritesQueryKey) ?? [];

  return useMutation({
    mutationFn: (productId: string) => {
      const isFav = favorites.some((f) => f.id === productId);
      return isFav
        ? favoritesApi.remove(productId)
        : favoritesApi.add(productId);
    },

    onMutate: async (productId) => {
      await qc.cancelQueries({ queryKey: favoritesQueryKey });
      const previous = qc.getQueryData(favoritesQueryKey);

      qc.setQueryData<{ id: string }[]>(favoritesQueryKey, (old = []) => {
        const exists = old.some((f) => f.id === productId);
        return exists
          ? old.filter((f) => f.id !== productId)
          : [...old, { id: productId }];
      });

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      qc.setQueryData(favoritesQueryKey, ctx?.previous);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: favoritesQueryKey });
    },
  });
}
