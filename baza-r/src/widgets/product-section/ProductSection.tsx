import type { Product } from "@/entities/product/model/Product";
import ProductCardSkeleton from "@/shared/components/ui/loaders/ProductCardSkeleton";
import { Section } from "@/shared/components/ui/product-section/ui/Section";
import { ProductCardCompact } from "../product-card/ProductCardCompact";
import { ProductsGrid } from "../product-grid/ui/ProductGrid";

interface ProductSectionProps {
  title: string;
  products: Product[];
  slidesCount?: number;
  isLoading?: boolean;
}

export function ProductSection({
  title,
  products,
  slidesCount = 5,
  isLoading,
}: ProductSectionProps) {
  return (
    <Section aria-label={title} title={title}>
      <ProductsGrid>
        {isLoading
          ? Array.from({ length: slidesCount }).map((_, i) => (
              <li key={i} className="flex-1">
                <ProductCardSkeleton className="h-75" />
              </li>
            ))
          : products.map((p) => (
              <li
                key={p.id}
                style={
                  {
                    "--countSlides": slidesCount ?? 5,
                  } as React.CSSProperties
                }
                className="product-slide min-w-40 shrink-0"
              >
                <ProductCardCompact product={p} />
              </li>
            ))}
      </ProductsGrid>
    </Section>
  );
}
