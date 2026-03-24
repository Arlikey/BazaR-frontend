export function calcDiscount(currentPrice: number, oldPrice: number): number {
  return Math.round((1 - currentPrice / oldPrice) * 100);
}

export type StockStatusType = "available" | "ending" | "unavailable";

export function getStockStatus(
  stock: number | boolean | null | undefined,
): StockStatusType {
  if (stock == null) return "unavailable";
  if (typeof stock === "number") {
    if (stock === 0) return "unavailable";
    if (stock <= 5) return "ending";
    return "available";
  }
  return stock ? "available" : "unavailable";
}

export const STOCK_LABELS: Record<StockStatusType, string> = {
  available: "Є в наявності",
  ending: "Закінчується",
  unavailable: "Немає в наявності",
};
