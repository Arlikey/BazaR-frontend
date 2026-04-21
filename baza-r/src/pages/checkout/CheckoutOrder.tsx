import Block from "../../shared/components/ui/Block";

type Props = {
  totalAmount: string;
  currency: string;
};

export function CheckoutOrder({ totalAmount, currency }: Props) {
  return (
    <Block className="flex items-center justify-between bg-transparent p-6 pl-10">
      <p className="text-3xl">Замовлення №1</p>
      <p className="text-xl">
        на суму:{" "}
        <span>
          {totalAmount}
          <span className="text-base">{currency}</span>
        </span>
      </p>
    </Block>
  );
}
