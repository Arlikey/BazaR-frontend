import Block from "../../../shared/components/ui/Block";
import { Button } from "../../../shared/components/ui/Button";
import { useUiStore } from "../../../shared/model/ui.store";
import { useCartStore } from "../model/cart.store";

type Props = {
  onClose: () => void;
};

export function CartFooter() {
  const totalPrice = useCartStore((s) => s.totalPrice());
  const closeCart = useUiStore((s) => s.closeCart);

  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        variant="outline"
        rounded="pill"
        color="subtle"
        size="lg"
        className="border-accent text-accent hover:bg-accent h-11 px-8 text-base hover:text-white"
        onClick={() => closeCart()}
      >
        Продовжити покупки
      </Button>
      <Block rounded="lg" className="flex items-center gap-25 py-5 pr-15 pl-10">
        <span className="text-2xl font-medium">
          {totalPrice.toLocaleString("uk-UA")}{" "}
          <span className="text-xl">₴</span>
        </span>
        <Button
          variant="solid"
          color="secondary"
          rounded="pill"
          size="lg"
          className="h-11 px-8 text-base font-medium"
        >
          Оформити замовлення
        </Button>
      </Block>
    </div>
  );
}
