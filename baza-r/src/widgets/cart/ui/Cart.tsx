import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "../../../entities/cart/queries";
import { CrossIcon } from "../../../shared/components/icons/ui/CrossIcon";
import { Button } from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { useUiStore } from "../../../shared/model/ui.store";
import { CartEmpty } from "./CartEmpty";
import { CartFooter } from "./CartFooter";
import { CartItem } from "./CartItem";

export function Cart() {
  const { data: cart, isLoading } = useCart();
  const closeDrawer = useUiStore((s) => s.closeCart);

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="flex max-h-[90vh] flex-col gap-5 px-20 py-10">
      <div className="flex justify-between">
        <h3 className="text-2xl">
          Кошик
        </h3>
        <Button color="default" onClick={closeDrawer}>
          <IconWrapper>
            <CrossIcon />
          </IconWrapper>
        </Button>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-neutral-100"
            />
          ))}
        </div>
      )}

      {!isLoading && isEmpty && <CartEmpty />}

      {!isLoading && !isEmpty && (
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-3 overflow-y-auto">
            {cart!.items.map((item) => (
              <CartItem key={item.offerId} item={item} />
            ))}
          </div>
          <CartFooter totalAmount={cart!.totalAmount} />
        </div>
      )}
    </div>
  );
}
