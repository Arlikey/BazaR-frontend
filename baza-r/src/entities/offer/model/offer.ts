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

export type ListOffer = {
  id: string;
  priceAmount: number;
  priceCurrency: string;
  oldPriceAmount: number | null;
  stockQuantity: number;
  isFavorite: boolean;
};
