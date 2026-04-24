import OrdersSection from "./OrdersSection";

export default function OrdersPage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-3xl font-medium">Мої замовлення </h1>
      <OrdersSection />
    </div>
  );
}
