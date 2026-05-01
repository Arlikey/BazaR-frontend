import type { ProductImage } from "./ProductImage";

export type ProductDetails = {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  brandId: string | null;
  vendorCode: string | null;
  slug: string;
  status: string;
  mainImageUrl: string | null;
  images: ProductImage[];
};