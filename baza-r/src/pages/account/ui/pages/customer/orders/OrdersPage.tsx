import NoOrdersIcon from "../../../../../../shared/components/icons/ui/NoOrdersIcon";
import { Button } from "../../../../../../shared/components/ui/Button";

export default function OrdersPage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-3xl font-medium">
        Мої замовлення{" "}
        {/* <span className="text-2xl text-neutral-300">
          {favorites?.length ? favorites.length : ""}
        </span> */}
      </h1>
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
        >
          Повернутись до каталогу
        </Button>
      </div>
    </div>
  );
}
