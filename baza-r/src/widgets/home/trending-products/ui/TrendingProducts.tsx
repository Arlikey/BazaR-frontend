import { useEffect, useState } from "react";
import ProductDao from "../../../../entities/product/api/__mocks__/ProductDao";
import ProductCardSkeleton from "../../../../shared/components/ui/loaders/ProductCardSkeleton";
import { Section } from "../../../../shared/components/ui/product-section/ui/Section";
import { tryCatch } from "../../../../shared/lib/try-catch";
import { ProductCardCompact } from "../../../product-card/ProductCardCompact";
import { ProductsGrid } from "../../../product-grid/ui/ProductGrid";
import type { Product } from "../../../../entities/product/model/Product";

export function TrendingProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const [items, err] = await tryCatch(ProductDao.getTrendingProducts());
      if (err) setError(err);
      else setData(items ?? []);
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <Section title="Зараз шукають">
      {error ? (
        <div className="text-error text-sm">Не вдалося завантажити</div>
      ) : (
        <ProductsGrid columns={5}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>
                  <ProductCardSkeleton className="h-[300px]"/>
                </li>
              ))
            : data.map((p) => (
                <li key={p.id}>
                  <ProductCardCompact product={p} className=""/>
                </li>
              ))}
        </ProductsGrid>
      )}
    </Section>
  );
}
