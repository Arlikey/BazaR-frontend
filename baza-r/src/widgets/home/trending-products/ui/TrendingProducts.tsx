import { useEffect, useState } from "react";
import ProductCardSkeleton from "../../../../shared/components/ui/loaders/ProductCardSkeleton";
import { Section } from "../../../../shared/components/ui/product-section/ui/Section";
import { ProductCardCompact } from "../../../product-card/ProductCardCompact";
import { ProductsGrid } from "../../../product-grid/ui/ProductGrid";
import { uiText } from "../../../../shared/config/ui-text";
import { useProductsByCategory } from "../../../../entities/product/queries";
import { toProduct } from "../../../../entities/product/model/ProductListItem";

export function TrendingProducts() {
  const { data: products = [], isLoading: productsLoading } =
    useProductsByCategory("7a8fa541-8603-464a-863e-7bd41420b241");

  return (
    <Section
      aria-label={uiText.home.trendingProductsTitle}
      title={uiText.home.trendingProductsTitle}
    >
      <ProductsGrid>
        {productsLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <ProductCardSkeleton className="h-75" />
              </li>
            ))
          : products.map((p) => (
              <li key={p.id} className="flex-1 shrink-0">
                <ProductCardCompact product={toProduct(p)} />
              </li>
            ))}
      </ProductsGrid>
    </Section>
  );
}
