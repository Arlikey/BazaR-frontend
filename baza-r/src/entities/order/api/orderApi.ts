import { api } from "@/shared/api/client";
import type { OrderDetails, OrdersResponse } from "../model/types";

export const orderApi = {
  getOrders: (page: number, pageSize: number) =>
    api<OrdersResponse>(
      `/api/customer/orders?page=${page}&pageSize=${pageSize}`,
    ),
  getById: (id: string) => api<OrderDetails>(`/api/customer/orders/${id}`),
};
