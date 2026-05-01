import type { ReactNode } from "react";

export type ProductColor = {
  value: string;
  label: string;
  to: string;
};

export type StockStatus = "available" | "unavailable" | "ending";

export type PaymentBadge = {
  id: string;
  icon: ReactNode;
  label: string;
};

export type PurchaseBlockProps = {
  productId: string;
  offerId: string;
  price: number;
  oldPrice?: number | null;

  stockStatus: StockStatus;

  colors?: ProductColor[];
  activeColor?: string;

  bonusAmount?: number;

  paymentBadges?: PaymentBadge[];

  creditAvailable?: boolean;

  onBuy: () => void;
  onFavorite: () => void;
  onCompare: () => void;
  isFavorite?: boolean;
  isCompared?: boolean;
};
