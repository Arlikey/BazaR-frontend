import { useQuery } from "@tanstack/react-query";
import { userApi } from "./api/userApi";
import { useAuthStore } from "../../shared/model/auth.store";

export const meQueryKey = ["me"] as const;

export function useMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: meQueryKey,
    queryFn: () => userApi.me(),
    enabled: isAuthenticated,
    retry: false,
    staleTime: 5 * 60 * 1000,
    throwOnError: false,
  });
}
