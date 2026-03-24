import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../shared/model/auth.store";
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
  const { data: favorites = [] } = useFavorites();

  return useMutation({
    mutationFn: (productId: string) => {
      const isFav = favorites.some((p) => p.id === productId);
      return isFav
        ? favoritesApi.remove(productId)
        : favoritesApi.add(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: favoritesQueryKey }),
  });
}
