import type { Cart } from "./cart";

export const EMPTY_CART: Cart = {
  id: "",
  status: "Active",
  currency: "UAH",
  itemsCount: 0,
  totalQuantity: 0,
  totalAmount: 0,
  createdAt: "",
  updatedAt: "",
  items: [],
};
