import NoOrdersIcon from "../../../../../../shared/components/icons/ui/NoOrdersIcon";
import { Button } from "../../../../../../shared/components/ui/Button";
import { useOrders } from "../../../../../../entities/order/hooks/useOrders";
import { OrderAccordionItem } from "./OrderAccordionItem";
import * as Accordion from "@radix-ui/react-accordion";
import { useNavigate } from "react-router";

const OrdersSection = () => {
  const { data: orders, isLoading } = useOrders(1, 10);
  const navigate = useNavigate();

  if (!orders || orders.items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-12.5">
        <div className="flex flex-col items-center justify-center gap-15">
          <NoOrdersIcon />
          <span className="text-muted text-2xl font-semibold">
            У вас поки що немає жодного замовлення :(
          </span>
        </div>
        <Button
          color="secondary"
          rounded="pill"
          className="w-full max-w-65 py-4 text-base font-medium"
          onClick={() => navigate("/")}
        >
          Повернутись до каталогу
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <Accordion.Root type="multiple" className="mt-4 flex flex-col gap-3">
      {orders.items.map((order) => (
        <OrderAccordionItem key={order.id} order={order} />
      ))}
    </Accordion.Root>
  );
};

export default OrdersSection;
