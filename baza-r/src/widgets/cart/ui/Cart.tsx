import {
  useCart,
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
    <div className="relative flex max-h-screen flex-col gap-5 py-5 md:py-10 md:max-h-[90vh]">
      <div className="flex justify-between px-5 lg:px-20">
        <h3 className="text-2xl">Кошик</h3>
        <Button
          color="default"
          onClick={closeDrawer}
          className="hover:text-accent h-8 w-8"
        >
          <IconWrapper>
            <CrossIcon />
          </IconWrapper>
        </Button>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-3 px-10 lg:px-20">
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
        <div className="flex flex-col overflow-y-auto gap-5">
          <div className="flex flex-col gap-2.5 px-5 lg:px-20">
            <div className="flex flex-col gap-3">
              {cart!.items.map((item) => (
                <CartItem key={item.offerId} item={item} />
              ))}
            </div>
          </div>
          <div className="px-2 md:px-5 pb-2 lg:px-20 sticky bottom-0 bg-neutral-50">
            <CartFooter totalAmount={cart!.totalAmount} />
          </div>
        </div>
      )}
    </div>
  );
}
