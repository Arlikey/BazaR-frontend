import { api } from "../../../shared/api/client";

export type SellerMe = {
  id: string;
  name: string;
  slug: string;
  status: number;
};

export type SellerProduct = {
  id: string;
  name: string;
  slug: string;
  status: string;
  mainImageUrl: string | null;
  vendorCode: string | null;
};

export const sellerApi = {
  getMe: () => api<SellerMe>("/api/seller/me"),
};
