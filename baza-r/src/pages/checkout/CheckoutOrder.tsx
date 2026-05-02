import Block from "@/shared/components/ui/Block";
import { formatPrice, getCurrencySymbol } from "@/shared/lib/formatMoney";

type Props = {
  orderNumber: number;
  sellerName: string;
  subtotal: number;
  currency: string;
};

export function CheckoutOrder({ orderNumber, subtotal, currency }: Props) {
  return (
    <Block className="flex items-center justify-between bg-transparent p-6 pl-10">
      <p className="text-3xl">Замовлення {orderNumber}</p>
      <p className="text-xl">
        на суму:{" "}
        <span>
          {formatPrice(subtotal)}
          <span className="text-base">{getCurrencySymbol(currency)}</span>
        </span>
      </p>
    </Block>
  );
}
