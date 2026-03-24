import { api } from "../../../shared/api/client";
import type { Cart } from "../model/cart";

export const cartApi = {
  getCart: () => api<Cart>("/api/customer/me/cart"),
  addItem: (offerId: string, quantity = 1) =>
    api("/api/customer/me/cart/items", {
      method: "POST",
      body: JSON.stringify({ offerId, quantity }),
    }),
  updateItem: (offerId: string, quantity: number) =>
    api(`/api/customer/me/cart/items/${offerId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    }),
  removeItem: (offerId: string) =>
    api(`/api/customer/me/cart/items/${offerId}`, { method: "DELETE" }),
  clearCart: () => api("/api/customer/me/cart/items", { method: "DELETE" }),
};
