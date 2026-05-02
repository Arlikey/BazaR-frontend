import { useQuery } from "@tanstack/react-query";
import { checkoutApi } from "../api/checkoutApi";

export function usePaymentMethods(sellerId: string) {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: () => checkoutApi.getPaymentMethods(sellerId),
  });
}
