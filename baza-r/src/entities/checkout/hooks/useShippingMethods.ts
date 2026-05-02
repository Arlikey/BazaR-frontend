import { useQuery } from "@tanstack/react-query";
import { checkoutApi } from "../api/checkoutApi";

export function useShippingMethods(sellerId: string) {
  return useQuery({
    queryKey: ["shipping-methods"],
    queryFn: () => checkoutApi.getShippingMethods(sellerId),
  });
}
