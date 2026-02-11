import { useEffect, useState } from "react";
import { ProductCard } from "../../../../entities/product/ui/ProductCard";
import { usePromoProducts } from "../../../../features/products/model/queries";
import ProductCardSkeleton from "../../../../shared/components/ui/loaders/ProductCardSkeleton";
import { Section } from "../../../../shared/components/ui/product-section/ui/Section";
import { ProductCardCompact } from "../../../product-card/ProductCardCompact";
import type { Product } from "../../../../entities/product/model/Product";
import ProductDao from "../../../../entities/product/api/__mocks__/ProductDao";
import { tryCatch } from "../../../../shared/lib/try-catch";

export function PromoProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);

      const [data, err] = await tryCatch(ProductDao.getTrendingProducts());

      if (err) setError(err);
      else if (data) setData(data);

      setIsLoading(false);
    };

    load();
    return () => {};
  }, []);

  return (
    <Section title="Акційні пропозиції">
      {isLoading && (
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCardSkeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <div className="text-error text-sm">Не вдалося завантажити</div>
      )}

      {data && (
        <div className="grid grid-cols-5 gap-4">
          {data.map((p) => (
            <ProductCardCompact product={p} />
          ))}
        </div>
      )}
    </Section>
  );
}
