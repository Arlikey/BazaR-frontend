export type Product = {
  id: string;
  categoryId: number;
  name: string;

  imageUrl: string | null;

  oldPrice: number | null;
  currentPrice: number | null;

  isActive: boolean;
  isAwaited?: boolean | null;
};
