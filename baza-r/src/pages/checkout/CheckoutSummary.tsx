import { useCart } from "../../entities/cart/queries";
import Block from "../../shared/components/ui/Block";
import { Button } from "../../shared/components/ui/Button";
import { formatPrice, getCurrencySymbol } from "../../shared/lib/formatMoney";
import { pluralize, PLURALS } from "../../shared/lib/pluralize";

type Props = {
  totalQuantity: number;
  totalAmount: string;
  currency: string;
};

export function CheckoutSummary({
  totalQuantity,
  totalAmount,
  currency,
}: Props) {
  return (
    <div className="sticky top-5 w-full max-w-85 self-start">
      <Block className="flex flex-col gap-5 p-6">
        <p className="text-2xl">Разом</p>
        <div className="flex flex-col gap-3 text-base">
          <div className="flex justify-between">
            <p>
              {totalQuantity} {pluralize(totalQuantity, PLURALS.product)} на
              суму
            </p>
            <p>
              {totalAmount}
              <span className="text-sm">{currency}</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p>Вартість доставки</p>
            <p>Безкоштовно</p>
          </div>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <p className="font-medium">До сплати</p>
          <p className="text-2xl">
            {totalAmount}
            <span className="text-base">{currency}</span>
          </p>
        </div>
        <Button
          color="secondary"
          className="mt-4 py-4"
          rounded="pill"
          fullWidth
        >
          Замовлення підтверджую
        </Button>
        <div className="mt-5 flex flex-col gap-4 text-sm text-black/50">
          <p className="font-medium">
            Отримання замовлення від 5 000 ₴ тільки за паспортом (Закон від
            06.12.2019 № 361-IX)
          </p>
          <ul className="list-disc">
            Підтверджуючи замовлення, я приймаю умови:
            <li className="ml-8">
              положення про обробку і захист персональних даних
            </li>
            <li className="ml-8">угоди користувача</li>
          </ul>
        </div>
      </Block>
    </div>
  );
}
