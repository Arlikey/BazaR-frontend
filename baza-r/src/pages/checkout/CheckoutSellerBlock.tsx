import { useMutation } from "@tanstack/react-query";
import type { SellerGroup } from "../../entities/checkout/model/groupLines";
import Block from "../../shared/components/ui/Block";
import { CheckoutOrder } from "./CheckoutOrder";
import { CheckoutOrderItems } from "./CheckoutOrderItems";
import { CheckoutPaymentForm } from "./CheckoutPaymentForm";
import { CheckoutRecipientForm } from "./CheckoutRecipientForm";
import { CheckoutShippingForm } from "./CheckoutShippingForm";
import type { ShippingDto } from "../../entities/checkout/model/types";
import { checkoutApi } from "../../entities/checkout/api/checkoutApi";

type Props = {
  orderNumber: number;
  group: SellerGroup;
  checkoutId: string;
  currency: string;
};

export function CheckoutSellerBlock({
  orderNumber,
  group,
  checkoutId,
  currency,
}: Props) {
  // Беремо перший lineId для форм — або потім будемо застосовувати до всіх

  return (
    <Block className="flex flex-col gap-8 p-6">
      <CheckoutOrder
        orderNumber={orderNumber}
        sellerName={group.sellerName}
        subtotal={group.subtotal}
        currency={currency}
      />

      {/* Всі товари продавця */}
      <CheckoutOrderItems lines={group.lines} />

      {/* Один раз на продавця, не на кожен товар */}
      <CheckoutShippingForm checkoutId={checkoutId} lines={group.lines} />
      <CheckoutPaymentForm checkoutId={checkoutId} lines={group.lines} />
      <CheckoutRecipientForm checkoutId={checkoutId} lines={group.lines} />
    </Block>
  );
}
