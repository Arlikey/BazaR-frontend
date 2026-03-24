export type CartItem = {
  offerId: string;
  productName: string;
  productSlug: string;
  mainImageUrl: string | null;
  description: string | null;
  sellerName: string;
  quantity: number;
  priceAmount: number;
  currency: string;
  totalPrice: number;
};

export type Cart = {
  id: string;
  status: string;
  currency: string;
  itemsCount: number;
  totalQuantity: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
};
