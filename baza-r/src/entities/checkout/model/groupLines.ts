import type { CheckoutLine } from "./types";

export type SellerGroup = {
  sellerId: string;
  sellerName: string;
  lines: CheckoutLine[];
  subtotal: number;
};

export function groupLinesBySeller(lines: CheckoutLine[]): SellerGroup[] {
  const map = new Map<string, SellerGroup>();

  for (const line of lines) {
    const existing = map.get(line.sellerId);
    if (existing) {
      existing.lines.push(line);
      existing.subtotal += line.lineTotal;
    } else {
      map.set(line.sellerId, {
        sellerId: line.sellerId,
        sellerName: line.sellerName,
        lines: [line],
        subtotal: line.lineTotal,
      });
    }
  }

  return Array.from(map.values());
}
