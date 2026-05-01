import { useAddToCart, useCart } from "../../../../../entities/cart/queries";
import { CartIcon } from "../../../../../shared/components/icons/ui/CartIcon";
import {
  Button,
} from "../../../../../shared/components/ui/Button";
import IconWrapper from "../../../../../shared/components/ui/IconWrapper";
import { toast } from "../../../../../shared/components/ui/Toast";
import { useUiStore } from "../../../../../shared/model/ui.store";

type Props = {
  offerId: string;
  rounded?: "md" | "sm" | "pill";
  className?: string;
};

export function CartButton({ offerId, rounded = "pill", className }: Props) {
  const { mutate, isPending } = useAddToCart();
  const openCart = useUiStore((s) => s.openCart);
  const { data: cart } = useCart();

  const isInCart =
    cart?.items.some((item) => item.offerId === offerId) ?? false;

  return (
    <Button
      variant="solid"
      rounded={rounded}
      color="secondary"
      border="thin"
      size="lg"
      className={`1.5xl:w-50 h-11 w-full text-base ${isInCart ? "border-accent text-accent hover:bg-accent bg-white hover:text-white" : "text-white"} ${className}`}
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();

        if (isInCart) {
          openCart();
          return;
        }
        mutate(
          { offerId },
          {
            onSuccess: () => {
              toast({
                id: "cart-toast",
                title: (
                  <div className="flex items-center gap-2">
                    <IconWrapper size={18}>
                      <CartIcon />
                    </IconWrapper>
                    Товар додано до кошика
                  </div>
                ),
                button: {
                  children: "Перейти",
                  onClick: openCart,
                },
              });
            },
          },
        );
      }}
    >
      {isInCart ? (
        <div className="flex items-center gap-3">
          <CartIcon />В кошику
        </div>
      ) : (
        "Купити"
      )}
    </Button>
  );
}
