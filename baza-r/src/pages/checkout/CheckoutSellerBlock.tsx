import type { SellerGroup } from "../../entities/checkout/model/groupLines";
import Block from "../../shared/components/ui/Block";
import { CheckoutOrder } from "./CheckoutOrder";
import { CheckoutOrderItems } from "./CheckoutOrderItems";
import { CheckoutPaymentForm } from "./CheckoutPaymentForm";
import { CheckoutRecipientForm } from "./CheckoutRecipientForm";
import { CheckoutShippingForm } from "./CheckoutShippingForm";

type Props = {
  orderNumber: number;
  group: SellerGroup;
  checkoutId: string;
  currency: string;
  contacts: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
};

export function CheckoutSellerBlock({
  orderNumber,
  group,
  checkoutId,
  currency,
  contacts,
}: Props) {
  return (
    <Block className="flex flex-col gap-8 p-6">
      <CheckoutOrder
        orderNumber={orderNumber}
        sellerName={group.sellerName}
        subtotal={group.subtotal}
        currency={currency}
      />

      <CheckoutOrderItems lines={group.lines} />

      <CheckoutShippingForm checkoutId={checkoutId} lines={group.lines} />
      <CheckoutPaymentForm checkoutId={checkoutId} lines={group.lines} />
      <CheckoutRecipientForm
        checkoutId={checkoutId}
        lines={group.lines}
        contacts={contacts}
      />
    </Block>
  );
}
