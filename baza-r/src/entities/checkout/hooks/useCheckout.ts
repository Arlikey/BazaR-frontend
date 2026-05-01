import { useMutation, useQuery } from "@tanstack/react-query";
import { checkoutApi } from "../api/checkoutApi";

export function useCheckout(checkoutId: string | null) {
  return useQuery({
    queryKey: ["checkout", checkoutId],
    queryFn: () => checkoutApi.getById(checkoutId!),
    enabled: !!checkoutId,
  });
}

export function useCreateCheckout() {
  return useMutation({
    mutationFn: () => checkoutApi.create(),
  });
}
