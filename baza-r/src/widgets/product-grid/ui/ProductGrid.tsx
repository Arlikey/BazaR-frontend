type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ProductsGrid({ children, className }: Props) {
  return (
    <ul className={`flex gap-2.5 ${className ?? ""}`}>
      {children}
    </ul>
  );
}
