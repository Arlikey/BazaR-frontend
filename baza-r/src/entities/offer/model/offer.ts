import type { Money } from "../../../shared/model/types";

export type Offer = {
  id: string;
  productId: string;
  sellerId: string;

  price: Money;
  oldPrice?: Money;

  stock: number;
  sellerSku: string;
  deliveryDays?: number;
  minOrderQuantity: number;

  status: string;
};
