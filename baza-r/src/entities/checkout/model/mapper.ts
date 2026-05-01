export const PAYMENT_METHOD_MAP: Record<
  string,
  { method: number; provider: number; requiresOnlineAuthorization: boolean }
> = {
  LiqPayCheckout: { method: 1, provider: 1, requiresOnlineAuthorization: true },
  CashOnDelivery: {
    method: 4,
    provider: 0,
    requiresOnlineAuthorization: false,
  },
};

export const SHIPPING_METHOD_MAP: Record<string, number> = {
  NovaPoshtaWarehouse: 2,
  BazaR: 1,
};
