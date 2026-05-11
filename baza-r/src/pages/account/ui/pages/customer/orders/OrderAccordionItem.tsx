import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { orderApi } from "@/entities/order/api/orderApi";
import type { OrderItem } from "@/entities/order/model/types";
import { formatPrice, getCurrencySymbol } from "@/shared/lib/formatMoney";
import { CaretIcon } from "@/shared/components/icons/ui/CaretIcon";
import placeholder from "@/shared/assets/images/placeholder.webp";
import IconWrapper from "@/shared/components/ui/IconWrapper";
import CustomLink from "@/shared/components/ui/CustomLink";
import { CheckoutItemCol } from "../../../../../checkout/CheckoutItem";
import Skeleton from "@/shared/components/ui/loaders/Skeleton";
import { useMediaQuery } from "react-responsive";

const STATUS_COLOR: Record<number, string> = {
  1: "bg-yellow-400", // Pending
  2: "bg-blue-400", // Confirmed
  3: "bg-blue-500", // Shipped
  4: "bg-orange-400", // Processing
  5: "bg-green-500", // Delivered
  6: "bg-green-600", // Completed
  7: "bg-red-400", // Cancelled
};

type Props = { order: OrderItem };

export function OrderAccordionItem({ order }: Props) {
  const isLargeScreen = useMediaQuery({ minWidth: 1560 });
  const [open, setOpen] = useState(false);

  const { data: details, isLoading } = useQuery({
    queryKey: ["order", order.id],
    queryFn: () => orderApi.getById(order.id),
    enabled: open,
  });

  const statusColor = STATUS_COLOR[order.status] ?? "bg-neutral-300";
  const date = new Date(order.createdAtUtc).toLocaleDateString("uk-UA");

  return (
    <Accordion.Item
      value={order.id}
      className="overflow-hidden rounded-2xl border border-neutral-100 bg-white"
    >
      <Accordion.Header>
        <Accordion.Trigger
          onClick={() => setOpen((p) => !p)}
          className="group flex w-full items-center gap-4 p-6 outline-none"
        >
          <div className={`h-12 w-1 shrink-0 rounded-full ${statusColor}`} />

          <div className="flex flex-1 flex-col items-start gap-1 font-medium">
            <span className="text-base text-neutral-300">
              № {order.number} від {date}
            </span>
            <span className="text-lg">{order.statusText}</span>
          </div>

          <div
            className={`flex flex-1 flex-col items-start gap-1 text-lg transition ${open ? "opacity-0" : ""}`}
          >
            <span className="text-neutral-300">Сума замовлення</span>
            <span className="font-medium">
              {formatPrice(order.totalAmount)}
              <span className="text-sm">
                {getCurrencySymbol(order.currency)}
              </span>
            </span>
          </div>

          <img
            src={order.previewImageUrl ?? placeholder}
            className={`h-14 w-14 shrink-0 rounded-lg object-contain transition ${open ? "opacity-0" : ""}`}
            onError={(e) => {
              e.currentTarget.src = placeholder;
            }}
          />

          <div className="ml-4">
            <IconWrapper className="w-5 transition-transform duration-300 group-data-[state=open]:rotate-180">
              <CaretIcon />
            </IconWrapper>
          </div>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[slideUp_0.3s_ease-out] data-[state=open]:animate-[slideDown_0.3s_ease-out] [&_p]:text-base">
        {isLoading && (
          <div className="grid grid-cols-[1fr_2fr] gap-8 p-10 px-20">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        )}

        {details && (
          <div className="grid gap-8 p-10 lg:grid-cols-[1fr_2fr] lg:px-20">
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-neutral-800">
                Інформація про замовлення
              </p>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <p>{details.deliveryMethod}</p>
                  <p className="text-link font-medium">
                    {details.city}
                    {details.warehouse ? `, ${details.warehouse}` : ""}
                  </p>
                  {details.street && (
                    <p>
                      {details.street}, {details.building}
                      {details.apartment ? `, кв. ${details.apartment}` : ""}
                    </p>
                  )}
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <p className="font-semibold">
                    {details.customerFirstName} {details.customerLastName}
                  </p>
                  <p>{details.customerPhone}</p>
                  <p>{details.customerEmail}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <p className="font-medium">Товари</p>
              <div className="flex flex-col gap-3">
                {details.items.map((item) => (
                  <div key={item.productId} className="flex flex-col 2xl:flex-row items-center gap-5">
                    <div className="flex w-full items-center justify-center gap-5">
                      <img
                        src={item.imageUrl ?? placeholder}
                        className="h-24 w-24 shrink-0 rounded-lg object-contain"
                        onError={(e) => {
                          e.currentTarget.src = placeholder;
                        }}
                      />
                      <div className="flex flex-1">
                        <CustomLink
                          to={`/product/${item.productId}`}
                          color="blue"
                          className="line-clamp-3 text-base font-medium"
                        >
                          {item.productName}
                        </CustomLink>
                      </div>
                    </div>

                    <div className="flex w-full">
                      <div className="flex flex-1">
                        <CheckoutItemCol label="Ціна" align="start">
                          {formatPrice(item.unitPrice)}
                          {getCurrencySymbol(item.currency)}
                        </CheckoutItemCol>
                      </div>
                      <div className="flex flex-1">
                        <CheckoutItemCol label="Кількість">
                          {item.quantity}
                        </CheckoutItemCol>
                      </div>
                      <div className="flex flex-1">
                        <CheckoutItemCol label="Сума" align="end">
                          {formatPrice(item.unitPrice * item.quantity)}
                          {getCurrencySymbol(item.currency)}
                        </CheckoutItemCol>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex justify-end pt-3 text-2xl">
                <span className="flex gap-3 font-medium">
                  Разом
                  <span>
                    {formatPrice(details.grandTotalAmount)}
                    <span className="text-xl">
                      {getCurrencySymbol(details.currency)}
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </Accordion.Content>
    </Accordion.Item>
  );
}
