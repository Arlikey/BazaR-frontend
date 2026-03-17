export type ProductTab = {
  label: string;
  href: string;
};

export const PRODUCT_TABS: ProductTab[] = [
  { label: "Усе про товар", href: "#all" },
  { label: "Характеристики", href: "#specs" },
  { label: "Відгуки", href: "#reviews" },
  { label: "Питання", href: "#questions" },
  { label: "Відео", href: "#video" },
  { label: "Фото", href: "#photos" },
  { label: "Купують разом", href: "#together" },
];