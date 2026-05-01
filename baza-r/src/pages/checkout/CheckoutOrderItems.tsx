import type { CheckoutLine } from "../../entities/checkout/model/types";
import Block from "../../shared/components/ui/Block";
import { CheckoutItem } from "./CheckoutItem";
import { CheckoutStep } from "./CheckoutStep";

type Props = {
  lines: CheckoutLine[];
};

export function CheckoutOrderItems({ lines }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <CheckoutStep number={1} title="Товари" />
      <Block className="flex flex-col gap-6 p-6 pl-10">
        {lines.map((line) => (
          <CheckoutItem key={line.id} line={line} />
        ))}
      </Block>
    </div>
  );
}
