import type { ReactNode } from "react";
import type { Product } from "../../../entities/product/model/Product";
import { ProductCardCompact } from "../../product-card/ProductCardCompact";
import { ProductCardRich } from "../../product-card/ProductCardRich";
import ProductCardSkeleton from "../../../shared/components/ui/loaders/ProductCardSkeleton";

type Props = {
  products: Product[];
  className?: string;
  columns?: number;
};

export default function ProductsGrid({
  products,
  className,
  columns = 5,
}: Props) {
  if (products.length === 0) return null;

  return (
    <section className={className}>
      <ul className={`grid grid-cols-${columns} gap-2.5`}>
        <ProductCardSkeleton />
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ProductCardCompact product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
