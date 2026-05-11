import type { CheckoutLine } from "@/entities/checkout/model/types";
import { formatPrice, getCurrencySymbol } from "@/shared/lib/formatMoney";

import placeholder from "@/shared/assets/images/placeholder.webp";

type Props = { line: CheckoutLine };

export function CheckoutItem({ line }: Props) {
  return (
    <article className="flex items-center text-base">
      <div className="flex items-center flex-4">
        <figure className="flex items-center mr-4 h-16 w-16 shrink-0">
          <img
            src={line.productMainImageUrl ?? placeholder}
            alt={line.productTitle}
            onError={(e) => (e.currentTarget.src = placeholder)}
          />
        </figure>
        <p className="flex-1">{line.productTitle}</p>
      </div>
      <CheckoutItemCol label="Ціна">
        {formatPrice(line.unitPrice)}
        {getCurrencySymbol(line.currency)}
      </CheckoutItemCol>
      <CheckoutItemCol label="Кількість">{line.quantity}</CheckoutItemCol>
      <CheckoutItemCol label="Сума" align="end">
        {formatPrice(line.lineTotal)}
        {getCurrencySymbol(line.currency)}
      </CheckoutItemCol>
    </article>
  );
}

export function CheckoutItemCol({
  label,
  children,
  align = "center",
}: {
  label: string;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
}) {
  return (
    <div
      className={`flex h-full flex-1 flex-col justify-center gap-3 items-${align}`}
    >
      <p className="text-sm">{label}</p>
      <p className="font-medium">{children}</p>
    </div>
  );
}
