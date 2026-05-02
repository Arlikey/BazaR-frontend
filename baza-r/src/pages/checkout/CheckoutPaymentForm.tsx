import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Block from "@/shared/components/ui/Block";
import { CheckoutStep } from "./CheckoutStep";
import { checkoutApi } from "@/entities/checkout/api/checkoutApi";
import { usePaymentMethods } from "@/entities/checkout/hooks/usePaymentMethods";
import type { PaymentMethod } from "@/entities/checkout/model/methods";
import { PAYMENT_METHOD_MAP } from "@/entities/checkout/model/mapper";
import type { CheckoutLine } from "@/entities/checkout/model/types";

type Props = {
  checkoutId: string;
  lines: CheckoutLine[];
  sellerId: string;
};

export function CheckoutPaymentForm({ checkoutId, lines, sellerId }: Props) {
  const qc = useQueryClient();

  const { data, isLoading } = usePaymentMethods(sellerId);
  const options = data?.methods ?? [];

  const [selected, setSelected] = useState<string | null>(null);

  const { mutate: updatePayment } = useMutation({
    mutationFn: async (type: string) => {
      const mapped = PAYMENT_METHOD_MAP[type];
      if (!mapped) return;
      console.log(mapped);
      await Promise.all(
        lines.map((line) =>
          checkoutApi.updatePayment(checkoutId, line.id, mapped),
        ),
      );
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["checkout", checkoutId] });
    },
  });

  function handleSelect(type: string) {
    setSelected(type);
    updatePayment(type);
  }

  useEffect(() => {
    if (options.length > 0 && !selected) {
      handleSelect(options[0].type);
    }
  }, [options]);

  if (isLoading) {
    return <div>Loading payment methods...</div>;
  }

  console.log(selected);

  return (
    <div className="flex flex-col gap-3">
      <CheckoutStep number={3} title="Оплата" />

      <Block className="flex flex-col gap-4 p-6 pl-10">
        {options.map((option: PaymentMethod) => {
          const isSelected = selected === option.type;

          return (
            <label
              key={option.type}
              className="flex cursor-pointer items-start gap-3"
            >
              <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                  type="radio"
                  name={`payment-${lines[0].id}`}
                  checked={isSelected}
                  onChange={() => handleSelect(option.type)}
                  className="sr-only"
                />

                <div
                  className={`h-5 w-5 rounded-full border-2 transition ${
                    isSelected ? "border-accent" : "border-neutral-300"
                  }`}
                />

                {isSelected && (
                  <div className="bg-accent absolute h-2.5 w-2.5 rounded-full" />
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-base">{option.title}</span>

                {option.description && (
                  <span className="text-sm text-neutral-400">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </Block>
    </div>
  );
}
