import { EmptyCartIcon } from "@/shared/components/icons/ui/EmptyCartIcon";

export function CartEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-20 py-16">
      <EmptyCartIcon />
      <div className="text-subtle flex flex-col items-center gap-1 text-center font-medium">
        <h4 className="text-2xl">Ой! Кошик порожній!</h4>
        <p className="text-xl">Але це легко виправити!</p>
      </div>
    </div>
  );
}
