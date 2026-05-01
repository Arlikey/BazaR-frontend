import { useQuery } from "@tanstack/react-query";
import { sellerApi } from "./sellerApi";

export function useSellerMe() {
  return useQuery({
    queryKey: ["seller-me"],
    queryFn: () => sellerApi.getMe(),
    staleTime: 5 * 60 * 1000,
  });
}
