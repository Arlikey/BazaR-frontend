export type CheckoutLine = {
  id: string;
  productId: string;
  productTitle: string;
  productMainImageUrl: string | null;
  sellerId: string;
  sellerName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  shippingCost: number;
  grandTotal: number;
  currency: string;
  recipientName: string | null;
  recipientPhone: string | null;
  recipientEmail: string | null;
  shippingMethod: number | null;
  shippingCity: string | null;
  shippingRegion: string | null;
  shippingWarehouse: string | null;
  paymentMethod: number | null;
  paymentProvider: number | null;
  requiresOnlineAuthorization: boolean;
};

export type CheckoutResponse = {
  id: string;
  status: number;
  itemsSubtotal: number;
  shippingTotal: number;
  grandTotal: number;
  currency: string;
  lines: CheckoutLine[];
};

export type RecipientDto = {
  lineId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isCustomerRecipient: boolean;
};

export type ShippingDto = {
  method: number;
  country?: string;
  region?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  postalCode?: string;
  warehouseCode?: string;
  warehouseName?: string;
  comment?: string;
};

export type PaymentDto = {
  method: number;
  provider: number;
  requiresOnlineAuthorization: boolean;
};
