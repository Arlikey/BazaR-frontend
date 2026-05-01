import { api } from "../../../shared/api/client";
import type {
  PaymentMethodsResponse,
  ShippingMethodsResponse,
} from "../model/methods";
import type {
  CheckoutResponse,
  PaymentDto,
  RecipientDto,
  ShippingDto,
} from "../model/types";

export const checkoutApi = {
  create: () =>
    api<{ checkoutId: string }>("/api/customer/checkouts", {
      method: "POST",
      body: JSON.stringify({}),
    }),
  getById: (id: string) =>
    api<CheckoutResponse>(`/api/customer/checkouts/${id}`),

  getShippingMethods: async () =>
    api<ShippingMethodsResponse>(
      `/api/public/shipping-profile`,
    ),

  getPaymentMethods: async () =>
    api<PaymentMethodsResponse>(`/api/public/payment-profile`),

  updateRecipient: (checkoutId: string, body: RecipientDto) =>
    api(`/api/customer/checkouts/${checkoutId}/lines/recipient`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  updateShipping: (checkoutId: string, lineId: string, body: ShippingDto) =>
    api(`/api/customer/checkouts/${checkoutId}/lines/${lineId}/shipping`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  updatePayment: (checkoutId: string, lineId: string, body: PaymentDto) =>
    api(`/api/customer/checkouts/${checkoutId}/lines/${lineId}/payment`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  submit: (checkoutId: string) =>
    api(`/api/customer/checkouts/${checkoutId}/submit`, { method: "POST" }),
};
