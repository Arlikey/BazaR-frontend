export type OfferResponse = {
  offerId: string;
  productId: string;
  sellerId: string;
  priceAmount: number;
  priceCurrency: string;
  oldPriceAmount: number | null;
  stock: number;
  sellerSku: string;
  deliveryDays: number | null;
  minOrderQuantity: number;
  status: string;
};
