type Props = {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4 | 5 | 6;
};

const colsClass: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

export function ProductsGrid({ children, columns = 5, className }: Props) {
  return (
    <ul className={`grid gap-2.5 ${colsClass[columns]} ${className ?? ""}`}>
      {children}
    </ul>
  );
}
