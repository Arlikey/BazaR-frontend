import { useSearchParams } from "react-router";
import CustomLink from "@/shared/components/ui/CustomLink";
import { formatPrice, getCurrencySymbol } from "@/shared/lib/formatMoney";
import { CheckoutContactsForm } from "./CheckoutContactsForm";
import { CheckoutSummary } from "./CheckoutSummary";
import { useCheckout } from "@/entities/checkout/hooks/useCheckout";
import { groupLinesBySeller } from "@/entities/checkout/model/groupLines";
import { CheckoutSellerBlock } from "./CheckoutSellerBlock";
import { useState } from "react";

export default function CheckoutPage() {
  const [contacts, setContacts] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

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
            <CheckoutContactsForm
              contacts={contacts}
              setContacts={setContacts}
            />
            {groups.map((group, i) => (
              <CheckoutSellerBlock
                key={group.sellerId}
                orderNumber={i + 1}
                group={group}
                checkoutId={checkout.id}
                currency={currency}
                contacts={contacts}
              />
            ))}
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
              shippingTotal={checkout.shippingTotal}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
