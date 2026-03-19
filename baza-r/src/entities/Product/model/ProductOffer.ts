export type ProductOffer = {
  offerId: string;
  productId: string;
  sellerId: string;
  priceAmount: number;
  priceCurrency: string;
  oldPriceAmount: number | null;
  stock: number;
  deliveryDays: number | null;
  minOrderQuantity: number;
  status: string;
};
