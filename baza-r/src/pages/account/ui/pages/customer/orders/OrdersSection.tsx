import NoOrdersIcon from "@/shared/components/icons/ui/NoOrdersIcon";
import { Button } from "@/shared/components/ui/Button";
import { useOrders } from "@/entities/order/hooks/useOrders";
import { OrderAccordionItem } from "./OrderAccordionItem";
import * as Accordion from "@radix-ui/react-accordion";
import { useNavigate } from "react-router";
import { Pagination } from "@/widgets/pagination/Pagination";
import { ORDERS_PAGE_SIZE } from "@/shared/model/constants";
import { useState } from "react";
import Skeleton from "@/shared/components/ui/loaders/Skeleton";

const OrdersSection = () => {
  const [page, setPage] = useState(1);
  const { data: orders, isLoading } = useOrders(page, ORDERS_PAGE_SIZE);
  const navigate = useNavigate();

  const totalPages = Math.ceil((orders?.totalCount ?? 0) / ORDERS_PAGE_SIZE);

  function handlePageChange(newPage: number) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (isLoading) return <>
    {[...Array(ORDERS_PAGE_SIZE)].map(() => (
      <Skeleton className="w-full h-26 rounded-2xl"/>
    ))}
  </>;

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

  return (
    <>
      <Accordion.Root type="multiple" className="mt-4 flex flex-col gap-3">
        {orders.items.map((order) => (
          <OrderAccordionItem key={order.id} order={order} />
        ))}
      </Accordion.Root>

      <Pagination
        totalPages={totalPages}
        page={page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default OrdersSection;
