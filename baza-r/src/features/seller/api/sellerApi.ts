import { api } from "@/shared/api/client";
import type { RegisterSellerDto, SellerMe } from "../model/types";

export const sellerApi = {
  getMe: () => api<SellerMe>("/api/seller/me"),
  register: (dto: RegisterSellerDto) =>
    api<{ sellerId: string }>("/api/seller/me", {
      method: "POST",
      body: JSON.stringify(dto),
    }),
};
