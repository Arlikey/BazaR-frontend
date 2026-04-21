import { EMPTY_CART } from "../../entities/cart/model/emptyCart";
import { useCart } from "../../entities/cart/queries";
import Block from "../../shared/components/ui/Block";
import { Button } from "../../shared/components/ui/Button";
import CustomLink from "../../shared/components/ui/CustomLink";
import InputField from "../../shared/components/ui/InputField";
import { API_URL } from "../../shared/config/env";
import { formatPrice, getCurrencySymbol } from "../../shared/lib/formatMoney";
import { pluralize, PLURALS } from "../../shared/lib/pluralize";
import { CheckoutContactsForm } from "./CheckoutContactsForm";
import { CheckoutOrder } from "./CheckoutOrder";
import { CheckoutOrderItems } from "./CheckoutOrderItems";
import { CheckoutRecipientForm } from "./CheckoutRecipientForm";
import { CheckoutSummary } from "./CheckoutSummary";

export default function CheckoutPage() {
  const { data: cart = EMPTY_CART, isLoading } = useCart();
  const totalAmount = formatPrice(cart.totalAmount);
  const currency = getCurrencySymbol(cart.currency);

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl py-10">
      <header className="flex pb-7 items-center">
        <p className="text-xl font-extrabold">BAZA-R</p>
        <div className="ml-auto flex text-sm gap-7">
          <p>
            Консультації по телефону:{" "}
            <CustomLink to={"tel:+380445370222"} className="font-medium">+38 044 537 02 22</CustomLink>
          </p>
          <CustomLink to={"#"} color="blue">Графік роботи call-центру</CustomLink>
        </div>
      </header>
      <main className="bw-b-thin bw-t-thin flex flex-col gap-5 border-neutral-200 py-10">
        <h1 className="text-3xl">Оформлення замовлення</h1>
        <div className="flex gap-11">
          <div className="flex flex-1 flex-col gap-5">
            <CheckoutContactsForm />
            <CheckoutOrder currency={currency} totalAmount={totalAmount} />
            <CheckoutOrderItems cart={cart} />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <span className="bw-thin flex h-6 w-6 items-center justify-center rounded-full border-neutral-100 bg-white text-base">
                  2
                </span>
                <h2 className="text-lg">Доставка</h2>
              </div>
              <div className="flex flex-col gap-4">
                <Block className="h-50 p-6 pl-10"></Block>
                <Block className="p-6 pl-10"></Block>
                <Block className="h-50 p-6 pl-10"></Block>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <span className="bw-thin flex h-6 w-6 items-center justify-center rounded-full border-neutral-100 bg-white text-base">
                  3
                </span>
                <h2 className="text-lg">Оплата</h2>
              </div>
              <Block className="h-50 p-6 pl-10"></Block>
            </div>
            <CheckoutRecipientForm />
          </div>
          <div className="sticky top-5 w-full max-w-85 self-start">
            <CheckoutSummary
              currency={currency}
              totalAmount={totalAmount}
              totalQuantity={cart.totalQuantity}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
