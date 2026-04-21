import type { CartItem } from "../../entities/cart/model/cart";
import { API_URL } from "../../shared/config/env";
import { formatPrice, getCurrencySymbol } from "../../shared/lib/formatMoney";

type Props = { item: CartItem };

export function CheckoutItem({ item }: Props) {
  return (
    <article className="flex items-center text-base">
      <figure className="mr-4 h-16 w-16 shrink-0">
        {item.mainImageUrl ? (
          <img
            src={`${API_URL}${item.mainImageUrl}`}
            alt=""
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="h-full w-full rounded-lg bg-neutral-100" />
        )}
      </figure>
      <p className="flex-1">{item.productName}</p>
      <CheckoutItemCol label="Ціна">
        {formatPrice(item.priceAmount)}
        {getCurrencySymbol(item.currency)}
      </CheckoutItemCol>
      <CheckoutItemCol label="Кількість">{item.quantity}</CheckoutItemCol>
      <CheckoutItemCol label="Сума" align="end">
        {formatPrice(item.totalPrice)}
        {getCurrencySymbol(item.currency)}
      </CheckoutItemCol>
    </article>
  );
}

function CheckoutItemCol({
  label,
  children,
  align = "center",
}: {
  label: string;
  children: React.ReactNode;
  align?: "center" | "end";
}) {
  return (
    <div className={`flex h-full w-30 flex-col gap-3 items-${align}`}>
      <p className="text-sm">{label}</p>
      <p className="font-medium">{children}</p>
    </div>
  );
}
