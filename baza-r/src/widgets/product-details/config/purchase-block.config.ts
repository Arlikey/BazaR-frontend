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
  price: number;
  oldPrice?: number;

  stockStatus: StockStatus;

  colors?: ProductColor[];
  activeColor?: string;

  bonusAmount?: number;

  paymentBadges?: PaymentBadge[];

  creditAvailable?: boolean;

  onBuy: () => void;
  onFavourite: () => void;
  onCompare: () => void;
  isFavourite?: boolean;
  isCompared?: boolean;
};
