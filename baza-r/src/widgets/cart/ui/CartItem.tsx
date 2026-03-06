import { useState } from "react";
import Block from "../../../shared/components/ui/Block";
import { Button } from "../../../shared/components/ui/Button";
import { useCartStore } from "../model/cart.store";
import type { CartItem } from "../model/cart.config";
import TrashIcon from "../../../shared/components/icons/ui/TrashIcon";

type Props = {
  item: CartItem;
};

export function CartItem({ item }: Props) {
  const { removeItem, updateQuantity } = useCartStore();
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <Block rounded="lg" className="flex items-center gap-5 px-10 py-4">
      {/* Фото */}
      <div className="h-20 w-20 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Название */}
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-base">{item.name}</span>
        {item.services && item.services.length > 0 && (
          <button
            onClick={() => setServicesOpen((p) => !p)}
            className="text-accent flex w-fit items-center gap-1 text-sm"
          >
            <span>{servicesOpen ? "▲" : "▼"}</span>
            <span>Додаткові послуги ({item.services.length})</span>
          </button>
        )}
        {servicesOpen && item.services && (
          <div className="mt-1 flex flex-col gap-1">
            {item.services.map((s) => (
              <div
                key={s.id}
                className="text-muted flex justify-between text-sm"
              >
                <span>{s.label}</span>
                <span>{s.price.toLocaleString("uk-UA")} ₴</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Количество */}
      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            updateQuantity(item.id, Math.max(1, item.quantity - 1))
          }
          className="text-muted hover:text-foreground text-lg transition-colors"
        >
          −
        </button>
        <span className="w-6 text-center text-base">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="text-muted hover:text-foreground text-lg transition-colors"
        >
          +
        </button>
      </div>

      {/* Цена */}
      <div className="flex flex-col items-end">
        {item.oldPrice && (
          <span className="text-muted text-base">
            <span className="line-through">
              {item.oldPrice.toLocaleString("uk-UA")}{" "}
            </span>
            <span className="text-xs">₴</span>
          </span>
        )}
        <span
          className={`text-[20px] font-medium tabular-nums ${item.oldPrice ? "text-promotion" : ""}`}
        >
          {(item.price * item.quantity).toLocaleString("uk-UA")}{" "}
          <span className="text-md">₴</span>
        </span>
      </div>

      {/* Удалить */}
      <button
        onClick={() => removeItem(item.id)}
        className="text-muted transition-colors hover:text-red-500"
      >
        <TrashIcon />
      </button>
    </Block>
  );
}
