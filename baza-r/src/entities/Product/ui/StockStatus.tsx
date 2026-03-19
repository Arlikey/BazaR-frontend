type Props = { inStock: boolean | null | undefined };

export function StockStatus({ inStock }: Props) {
  if (inStock === null || inStock === undefined) return null;
  return inStock ? (
    <span className="text-accent text-sm font-medium">Є в наявності</span>
  ) : (
    <span className="text-sm text-neutral-400">Немає в наявності</span>
  );
}
