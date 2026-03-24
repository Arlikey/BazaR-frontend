import {
  useRemoveCartItem,
  useUpdateCartItem,
} from "../../../entities/cart/queries";
import type { CartItem as CartItemType } from "../../../entities/cart/model/cart";
import Block from "../../../shared/components/ui/Block";
import { TrashIcon } from "../../../shared/components/icons/ui/TrashIcon";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { PlusIcon } from "../../../shared/components/icons/ui/PlusIcon";
import { MinusIcon } from "../../../shared/components/icons/ui/MinusIcon";
import InputField from "../../../shared/components/ui/InputField";
import { useEffect, useState } from "react";

type Props = { item: CartItemType };

export function CartItem({ item }: Props) {
  const { mutate: remove } = useRemoveCartItem();
  const { mutate: update } = useUpdateCartItem();
  const [qty, setQty] = useState(item.quantity);

  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  return (
    <Block
      rounded="lg"
      className="grid grid-cols-[100px_1fr_100px_100px_40px] items-center gap-10 px-10 py-6"
    >
      <div className="h-24 w-20 shrink-0">
        {item.mainImageUrl ? (
          <img
            src={`http://localhost:8080${item.mainImageUrl}`}
            alt={item.productName}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="h-full w-full rounded-lg bg-neutral-100" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="line-clamp-2 text-base leading-none">
          {item.productName}
        </span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() =>
            update({
              offerId: item.offerId,
              quantity: Math.max(1, item.quantity - 1),
            })
          }
          className="text-muted hover:text-foreground disabled:hover:text-muted flex h-8 w-8 items-center justify-center transition-colors"
          disabled={item.quantity <= 1}
        >
          <IconWrapper size={14}>
            <MinusIcon />
          </IconWrapper>
        </button>

        <input
          type="text"
          inputMode="numeric"
          value={qty}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setQty(val === "" ? 1 : parseInt(val));
          }}
          onBlur={() => {
            if (qty !== item.quantity && qty >= 1) {
              update({ offerId: item.offerId, quantity: qty });
            }
          }}
          className="focus:border-accent h-8 w-12 rounded-lg border border-neutral-200 text-center text-base outline-none"
        />

        <button
          onClick={() =>
            update({ offerId: item.offerId, quantity: item.quantity + 1 })
          }
          className="text-muted hover:text-foreground flex h-8 w-8 items-center justify-center transition-colors"
        >
          <IconWrapper size={14}>
            <PlusIcon />
          </IconWrapper>
        </button>
      </div>

      <span className="text-right text-xl font-medium tabular-nums">
        {item.totalPrice.toLocaleString("uk-UA")}{" "}
        <span className="text-md">₴</span>
      </span>

      <button
        onClick={() => remove(item.offerId)}
        className="text-muted transition-colors hover:text-red-500"
      >
        <TrashIcon />
      </button>
    </Block>
  );
}
