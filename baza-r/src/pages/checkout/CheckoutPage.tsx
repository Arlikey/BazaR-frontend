import { useSearchParams } from "react-router";
import Block from "../../shared/components/ui/Block";
import CustomLink from "../../shared/components/ui/CustomLink";
import { formatPrice, getCurrencySymbol } from "../../shared/lib/formatMoney";
import { CheckoutContactsForm } from "./CheckoutContactsForm";
import { CheckoutOrder } from "./CheckoutOrder";
import { CheckoutOrderItems } from "./CheckoutOrderItems";
import { CheckoutRecipientForm } from "./CheckoutRecipientForm";
import { CheckoutSummary } from "./CheckoutSummary";
import { useCheckout } from "../../entities/checkout/hooks/useCheckout";
import { CheckoutShippingForm } from "./CheckoutShippingForm";
import { groupLinesBySeller } from "../../entities/checkout/model/groupLines";
import { CheckoutSellerBlock } from "./CheckoutSellerBlock";

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const checkoutId = searchParams.get("checkoutId");
  const { data: checkout, isLoading } = useCheckout(checkoutId);

  if (isLoading || !checkout) {
    return <div>loading</div>;
  }
  const groups = groupLinesBySeller(checkout.lines);

  const currency = getCurrencySymbol(checkout.currency);
  const totalAmount = formatPrice(checkout.grandTotal);

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl py-10">
      <header className="flex items-center pb-7">
        <p className="text-xl font-extrabold">BAZA-R</p>
        <div className="ml-auto flex gap-7 text-sm">
          <p>
            Консультації по телефону:{" "}
            <CustomLink to={"tel:+380445370222"} className="font-medium">
              +38 044 537 02 22
            </CustomLink>
          </p>
          <CustomLink to={"#"} color="blue">
            Графік роботи call-центру
          </CustomLink>
        </div>
      </header>
      <main className="bw-b-thin bw-t-thin flex flex-col gap-5 border-neutral-200 py-10">
        <h1 className="text-3xl">Оформлення замовлення</h1>
        <div className="flex gap-11">
          <div className="flex flex-1 flex-col gap-5">
            <CheckoutContactsForm />
            {groups.map((group, i) => (
              <CheckoutSellerBlock
                key={group.sellerId}
                orderNumber={i + 1}
                group={group}
                checkoutId={checkout.id}
                currency={currency}
              />
            ))}
            {/* <Block className="flex flex-col gap-11 p-4">
              <CheckoutOrder  currency={currency} totalAmount={totalAmount} />
              <CheckoutOrderItems lines={checkout.lines} />
              <div className="flex flex-col gap-1">
                <CheckoutShippingForm
                  checkoutId={checkout.id}
                  lineId={checkout.lines[0].id}
                />
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
              <CheckoutRecipientForm
                checkoutId={checkout.id}
                lineId={checkout.lines[0].id} // поки один line, потім буде per seller
              />
            </Block> */}
          </div>
          <div className="sticky top-5 w-full max-w-85 self-start">
            <CheckoutSummary
              checkoutId={checkout.id}
              currency={currency}
              totalAmount={totalAmount}
              totalQuantity={checkout.lines.reduce(
                (sum, l) => sum + l.quantity,
                0,
              )}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
