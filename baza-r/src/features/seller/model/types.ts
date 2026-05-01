import type { ListOffer } from "@/entities/offer/model/offer";

export type SellerMe = {
  id: string;
  name: string;
  slug: string;
  status: number;
};

export type RegisterSellerDto = {
  name: string;
  slug: string;
  countryCode: string;
  description?: string;
  logoUrl?: string;
  legalName: string;
  taxNumber: string;
  supportEmail: string;
  supportPhone: string;
  submitForApproval: boolean;
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
