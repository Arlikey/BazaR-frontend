export type ProductTab = {
  label: string;
  id: string;
};

export const PRODUCT_TABS: ProductTab[] = [
  { label: "Усе про товар", id: "all" },
  { label: "Характеристики", id: "specs" },
  { label: "Відгуки та питання", id: "reviews" },
  // { label: "Відео", id: "video" },
  // { label: "Фото", id: "photos" },
  // { label: "Купують разом", id: "together" },
];
