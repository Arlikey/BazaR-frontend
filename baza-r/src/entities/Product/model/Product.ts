export type Product = {
  id: string;
  categoryId: string;
  name: string;
  imageUrl: string | null;
  oldPrice: number | null;
  currentPrice: number | null;
  isActive: boolean;
  isAwaited?: boolean | null;
  inStock?: boolean | null;
  rating?: number | null;
  reviewCount?: number | null;
};