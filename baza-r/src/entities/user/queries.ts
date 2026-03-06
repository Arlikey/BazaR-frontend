import { useQuery } from "@tanstack/react-query";
import { userApi } from "./api/userApi";

export const meQueryKey = ["me"] as const;

export function useMe() {
  return useQuery({
    queryKey: meQueryKey,
    queryFn: userApi.me,
    retry: false,
    staleTime: 5 * 60_000,
  });
}
