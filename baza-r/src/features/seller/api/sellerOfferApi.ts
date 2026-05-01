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
  pause: (offerId: string) =>
    api(`/api/seller/offers/${offerId}/pause`, { method: "POST" }),
  resume: (offerId: string) =>
    api(`/api/seller/offers/${offerId}/resume`, { method: "POST" }),
  setPrice: (offerId: string, amount: number, currency = "UAH") =>
    api(`/api/seller/offers/${offerId}/price`, {
      method: "PUT",
      body: JSON.stringify({ amount, currency }),
    }),
  setStock: (offerId: string, stock: number) =>
    api(`/api/seller/offers/${offerId}/stock`, {
      method: "PUT",
      body: JSON.stringify({ stock }),
    }),

  getByProduct: (productId: string) =>
    api<{
      offerId: string;
      priceAmount: number;
      oldPriceAmount: number | null;
      stock: number;
      status: string;
      deliveryDays: number | null;
      minOrderQuantity: number;
    }>(`/api/catalog/offers/by-product/${productId}`),

  setOldPrice: (offerId: string, amount: number, currency = "UAH") =>
    api(`/api/seller/offers/${offerId}/old-price`, {
      method: "PUT",
      body: JSON.stringify({ amount, currency }),
    }),
  deleteOldPrice: (offerId: string) =>
    api(`/api/seller/offers/${offerId}/old-price`, { method: "DELETE" }),
  setDelivery: (offerId: string, deliveryDays: number) =>
    api(`/api/seller/offers/${offerId}/delivery`, {
      method: "PUT",
      body: JSON.stringify({ deliveryDays }),
    }),
};
