import { Button } from "@/shared/components/ui/Button";
import cartImage from "@/shared/assets/images/Корзина_иллюстрация.png";
import { Navigate, useLocation, useNavigate } from "react-router";

export function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state?.fromCheckout) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-12 py-24 md:gap-16 lg:h-screen">
      <div className="flex flex-col items-center gap-8 md:gap-12">
        <h1 className="text-foreground-muted text-2xl font-medium md:text-[32px]">
          Дякуємо за замовлення!
        </h1>
        <img src={cartImage} alt="Кошик заповнений товарами" />
        <p className="text-foreground-muted text-center text-xl font-medium">
          Очікуйте повідомлення!
        </p>
      </div>

      <Button
        rounded="pill"
        color="secondary"
        size="lg"
        className="px-8 text-base"
        onClick={() => navigate("/")}
      >
        Перейти на головну сторінку
      </Button>
    </div>
  );
}
