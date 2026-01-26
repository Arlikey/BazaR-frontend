export type Product = {
  id: number;
  categoryId: number;
  name: string;

  imageUrl: string | null;

  oldPrice: number | null;
  currentPrice: number;

  isActive: boolean;
};
