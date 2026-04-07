import { useNavigate } from "react-router";
import Block from "../../../shared/components/ui/Block";
import { Button } from "../../../shared/components/ui/Button";
import { useUiStore } from "../../../shared/model/ui.store";

type Props = { totalAmount: number };

export function CartFooter({ totalAmount }: Props) {
  const closeCart = useUiStore((s) => s.closeCart);
  const navigate = useNavigate();
  return (
    <div className="flex w-full items-center justify-between py-2">
      <Button
        variant="outline"
        rounded="pill"
        color="subtle"
        size="lg"
        className="border-accent text-accent hover:bg-accent hidden h-11 px-8 lg:px-15 text-base leading-none hover:text-white md:flex"
        onClick={() => closeCart()}
      >
        Продовжити покупки
      </Button>
      <Block
        rounded="lg"
        className="flex w-full md:w-fit flex-col items-center justify-between gap-5 py-5 px-6 lg:px-10 md:flex-row lg:gap-25 ml-auto"
      >
        <div className="flex w-full justify-between text-[20px] font-medium">
          <span className="inline md:hidden">Разом</span>
          <span className="tabular-nums">
            {totalAmount.toLocaleString("uk-UA")}{" "}
            <span className="text-xl">₴</span>
          </span>
        </div>
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
