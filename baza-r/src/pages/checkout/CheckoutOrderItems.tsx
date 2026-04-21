import type { Cart } from "../../entities/cart/model/cart";
import { EMPTY_CART } from "../../entities/cart/model/emptyCart";
import { useCart } from "../../entities/cart/queries";
import Block from "../../shared/components/ui/Block";
import { formatPrice, getCurrencySymbol } from "../../shared/lib/formatMoney";
import { CheckoutItem } from "./CheckoutItem";
import { CheckoutStep } from "./CheckoutStep";

type Props = {
  cart: Cart;
};

export function CheckoutOrderItems({ cart }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <CheckoutStep number={1} title="Товари продавця BAZA-R" />
      <Block className="flex flex-col gap-6 p-6 pl-10">
        {cart.items.map((item) => (
          <CheckoutItem key={item.offerId} item={item} />
        ))}
      </Block>
    </div>
  );
}
