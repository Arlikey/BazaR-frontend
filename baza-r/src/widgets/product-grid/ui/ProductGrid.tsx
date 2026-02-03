import { ProductCardCompact } from "../../product-card/ProductCardCompact";
import type { Product } from "../../../entities/product/model/Product";

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
      <ul className={`grid grid-cols-5 gap-2.5`}>
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
