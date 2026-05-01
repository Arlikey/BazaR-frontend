import { useNavigate } from "react-router";
import Block from "@/shared/components/ui/Block";
import { Button } from "@/shared/components/ui/Button";
import { useUiStore } from "@/shared/model/ui.store";
import {
  formatPrice,
  getCurrencySymbol,
} from "@/shared/lib/formatMoney";
import { useMutation } from "@tanstack/react-query";
import { checkoutApi } from "@/entities/checkout/api/checkoutApi";

type Props = { totalAmount: number; currency: string };

export function CartFooter({ totalAmount, currency }: Props) {
  const closeCart = useUiStore((s) => s.closeCart);
  const navigate = useNavigate();

  const { mutate: createCheckout, isPending } = useMutation({
    mutationFn: () => checkoutApi.create(),
    onSuccess: ({ checkoutId }) => {
      closeCart();
      navigate(`/order?checkoutId=${checkoutId}`);
    },
    onError: () => {
    },
  });

  return (
    <div className="flex w-full items-center justify-between py-2">
      <Button
        variant="outline"
        rounded="pill"
        color="subtle"
        size="lg"
        className="border-accent text-accent hover:bg-accent hidden h-11 px-8 text-base leading-none hover:text-white md:flex lg:px-15"
        onClick={() => closeCart()}
      >
        Продовжити покупки
      </Button>
      <Block
        rounded="lg"
        className="ml-auto flex w-full flex-col items-center justify-between gap-5 px-6 py-5 md:w-fit md:flex-row lg:gap-25 lg:px-10"
      >
        <div className="flex w-full justify-between text-[20px] font-medium">
          <span className="inline md:hidden">Разом</span>
          <span className="tabular-nums">
            {formatPrice(totalAmount)}{" "}
            <span className="text-xl">{getCurrencySymbol(currency)}</span>
          </span>
        </div>
        <Button
          variant="solid"
          color="secondary"
          rounded="pill"
          size="lg"
          className="h-11 px-8 text-base font-medium"
          onClick={() => createCheckout()}
          disabled={isPending}
        >
          {isPending ? "Зачекайте..." : "Оформити замовлення"}
        </Button>
      </Block>
    </div>
  );
}
