import { getStockStatus, STOCK_LABELS } from "../model/productUtils";

type Props = { inStock: boolean | number | null | undefined };

export function StockStatus({ inStock }: Props) {
  const status = getStockStatus(inStock);
  if (status === "unavailable")
    return (
      <span className="text-sm font-medium text-black">
        {STOCK_LABELS.unavailable}
      </span>
    );
  if (status === "ending")
    return (
      <span className="text-promotion text-sm font-medium">
        {STOCK_LABELS.ending}
      </span>
    );
  return (
    <span className="text-accent text-sm font-medium">
      {STOCK_LABELS.available}
    </span>
  );
}
