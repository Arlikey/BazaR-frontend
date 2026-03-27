import { useNavigate } from "react-router";
import Block from "../../../shared/components/ui/Block";
import { Button } from "../../../shared/components/ui/Button";
import { useUiStore } from "../../../shared/model/ui.store";

type Props = { totalAmount: number };

export function CartFooter({ totalAmount }: Props) {
  const closeCart = useUiStore((s) => s.closeCart);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        variant="outline"
        rounded="pill"
        color="subtle"
        size="lg"
        className="border-accent text-accent hover:bg-accent h-11 px-15 text-base leading-none hover:text-white"
        onClick={() => closeCart()}
      >
        Продовжити покупки
      </Button>
      <Block rounded="lg" className="flex items-center gap-25 py-5 pr-15 pl-10">
        <span className="text-2xl font-medium">
          {totalAmount.toLocaleString("uk-UA")}{" "}
          <span className="text-xl">₴</span>
        </span>
        <Button
          variant="solid"
          color="secondary"
          rounded="pill"
          size="lg"
          className="h-11 px-8 text-base font-medium"
          onClick={() => navigate("/order")}
        >
          Оформити замовлення
        </Button>
      </Block>
    </div>
  );
}
