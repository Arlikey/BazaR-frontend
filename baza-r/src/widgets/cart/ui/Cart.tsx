import { useCartStore } from "../model/cart.store";
import { CartEmpty } from "./CartEmpty";
import { CartItem } from "./CartItem";
import { CartFooter } from "./CartFooter";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { CrossIcon } from "../../../shared/components/icons/ui";
import { Button } from "../../../shared/components/ui/Button";
import { useUiStore } from "../../../shared/model/ui.store";

export function Cart() {
  const items = useCartStore((s) => s.items);
  const isEmpty = items.length === 0;
  const closeDrawer = useUiStore((s) => s.closeCart);

  return (
    <div className="flex max-h-[90vh] flex-col gap-5 px-20 py-10">
      <div className="flex justify-between">
        <h3 className="text-2xl">Кошик</h3>
        <Button
          color="default"
          className="hover:text-accent-hover"
          onClick={() => closeDrawer()}
        >
          <IconWrapper>
            <CrossIcon />
          </IconWrapper>
        </Button>
      </div>

      {isEmpty ? (
        <CartEmpty />
      ) : (
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-3 overflow-y-auto">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartFooter />
        </div>
      )}
    </div>
  );
}
