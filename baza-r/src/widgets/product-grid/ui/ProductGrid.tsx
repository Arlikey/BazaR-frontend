import type { ReactNode } from "react";
import type { Product } from "../../../entities/product/model/Product";
import { ProductCardCompact } from "../../product-card/ProductCardCompact";
import { ProductCardRich } from "../../product-card/ProductCardRich";
import ProductCardLoader from "../../../shared/components/ui/loaders/ProductCardLoader";

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
        <ProductCardLoader />
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
