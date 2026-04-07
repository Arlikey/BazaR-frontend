import { useCart, useAddToCart } from "../../cart/queries";
import { useUiStore } from "../../../shared/model/ui.store";
import { toast } from "../../../shared/components/ui/Toast";
import { Button } from "../../../shared/components/ui/Button";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { CartIcon } from "../../../shared/components/icons/ui/CartIcon";
import { CheckIcon } from "../../../shared/components/icons/ui/CheckIcon";
import { Badge } from "../../../shared/components/ui/Badge";

type Props = { offerId: string };

export function CartButton({ offerId }: Props) {
  const { mutate, isPending } = useAddToCart();
  const openCart = useUiStore((s) => s.openCart);
  const { data: cart } = useCart();

  const isInCart =
    cart?.items.some((item) => item.offerId === offerId) ?? false;

  return (
    <Button
      color="subtle"
      size="icon"
      className="relative"
      disabled={isPending}
      rounded="md"
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
      <IconWrapper size={24}>
        <CartIcon />
      </IconWrapper>

      {isInCart && (
        <Badge variant="subtle">
          <IconWrapper size={8}>
            <CheckIcon />
          </IconWrapper>
        </Badge>
      )}
    </Button>
  );
}
