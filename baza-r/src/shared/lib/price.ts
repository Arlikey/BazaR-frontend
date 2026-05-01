export function isDiscount(oldPrice?: number | null, price?: number | null) {
  return oldPrice != null && price != null && oldPrice > price;
}

export function calcDiscountPercent(price: number, oldPrice: number) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}