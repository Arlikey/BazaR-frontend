export type PaymentMethod = {
  type: string;
  minAmount: number;
  maxAmount: number;
  title: string;
  description: string;
};

export type PaymentMethodsResponse = {
  methods: PaymentMethod[];
};

export type ShippingMethod = {
  type: string;
  baseFee: number;
  currency: string;
  freeFrom: number;
  cashOnDelivery: boolean;
  estimatedDaysMin: number;
  estimatedDaysMax: number;
  title: string;
  description: string;
};

export type ShippingMethodsResponse = {
  methods: ShippingMethod[];
};
