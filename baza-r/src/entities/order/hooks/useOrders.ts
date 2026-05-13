import { useQuery } from "@tanstack/react-query";
import { orderApi } from "../api/orderApi";

export function useOrders(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["orders", page, pageSize],
    queryFn: () => orderApi.getOrders(page, pageSize),
    placeholderData: (prev) => prev,
  });
}
