import { api } from "../../../shared/api/client";
import type { SellerProduct } from "./sellerApi";

export type CreateProductDto = {
  name: string;
  categoryId: string;
  description?: string;
  brandId?: string;
  vendorCode?: string;
  slug: string;
  barcode?: string;
  attributes: AttributeValueDto[];
};

export type AttributeValueDto = {
  attributeId: string;
  textValue?: string;
  numberValue?: number;
  boolValue?: boolean;
  optionId?: string;
  optionIds?: string[];
};

export type AttributeTemplateItem = {
  attributeId: string;
  name: string;
  valueType: 1 | 2 | 3 | 4 | 5; // Text, Number, Boolean, Select, MultiSelect
  isRequired: boolean;
  sectionName: string;
  sectionOrder: number;
  sortOrder: number;
  options?: { id: string; value: string }[];
};

export type AttributeDto = {
  id: string;
  name: string;
  valueType: 1 | 2 | 3 | 4 | 5;
  options?: { id: string; value: string }[];
};

export const sellerProductApi = {
  create: (dto: CreateProductDto) =>
    api<{ productId: string }>("/api/seller/me/products", {
      method: "POST",
      body: JSON.stringify(dto),
    }),

  uploadImages: (productId: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    return api(`/api/seller/me/products/${productId}/images`, {
      method: "POST",
      body: formData,
    });
  },

  getAttributeTemplate: (categoryId: string) =>
    api<AttributeTemplateItem[]>(
      `/api/catalog/categories/${categoryId}/attributes-template`,
    ),

  getAttributes: () => api<AttributeDto[]>("/api/catalog/attributes"),

  getAttributeOptions: (attributeId: string) =>
    api<{ id: string; value: string }[]>(
      `/api/catalog/attributes/${attributeId}/options`,
    ),

  getBySeller: (sellerId: string) =>
    api<SellerProduct[]>(`/api/catalog/products/seller/${sellerId}`),
};
