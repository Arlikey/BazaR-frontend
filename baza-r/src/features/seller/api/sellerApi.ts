import type { ListOffer } from "../../../entities/offer/model/offer";
import { api } from "../../../shared/api/client";

export type SellerMe = {
  id: string;
  name: string;
  slug: string;
  status: number;
};

export type SellerProductOffer = {
  productId: string;
  priceAmount: number;
  priceCurrency: string;
  oldPriceAmount: number | null;
  stockQuantity: number;
};

export type SellerProduct = {
  id: string;
  name: string;
  slug: string;
  mainImageUrl: string | null;
  offer: ListOffer | null;
};

export const sellerApi = {
  getMe: () => api<SellerMe>("/api/seller/me"),
};
