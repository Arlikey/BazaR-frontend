import { api } from "../../../shared/api/client";

export type CreateOfferDto = {
  productId: string;
  priceAmount: number;
  priceCurrency: string;
  stock: number;
  oldPriceAmount?: number;
  oldPriceCurrency?: string;
  sellerSku?: string;
  deliveryDays?: number;
  minOrderQuantity?: number;
  activate: boolean;
};

export const sellerOfferApi = {
  create: (dto: CreateOfferDto) =>
    api<{ id: string }>("/api/seller/offers", {
      method: "POST",
      body: JSON.stringify(dto),
    }),
};
