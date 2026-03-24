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
  inStock: boolean;
};

export type SellerProduct = {
  id: string;
  name: string;
  slug: string;
  mainImageUrl: string | null;
  offer: SellerProductOffer | null;
};

export const sellerApi = {
  getMe: () => api<SellerMe>("/api/seller/me"),
};