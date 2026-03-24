import { useEffect, useState } from "react";
import ProductCardSkeleton from "../../../../shared/components/ui/loaders/ProductCardSkeleton";
import { Section } from "../../../../shared/components/ui/product-section/ui/Section";
import { ProductCardCompact } from "../../../product-card/ProductCardCompact";
import { tryCatch } from "../../../../shared/lib/try-catch";
import { uiText } from "../../../../shared/config/ui-text";
import { Button } from "../../../../shared/components/ui/Button";
import { useProductsByCategory } from "../../../../entities/product/queries";
import { toProduct } from "../../../../entities/product/model/ProductListItem";

export function AwaitedProducts() {
  const { data: products = [], isLoading: productsLoading } =
    useProductsByCategory("7a8fa541-8603-464a-863e-7bd41420b241");

  return (
    <Section
      aria-label={uiText.home.awaitedProductsTitle}
      title={uiText.home.awaitedProductsTitle}
    >
      {productsLoading && (
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCardSkeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      )}

      {products && (
        <div className="grid h-152.5 grid-cols-[4fr_3fr_3fr] grid-rows-2 gap-2.5 [&>*:first-child]:row-span-2">
          {products.map(
            (p, i) =>
              i < 5 && (
                <ProductCardCompact
                  size={i === 0 ? "lg" : "md"}
                  product={toProduct(p)}
                />
              ),
          )}
        </div>
      )}
      <Button
        border="thin"
        color="subtle"
        className="mt-11 self-center rounded-4xl px-15 py-3.5"
      >
        <span className="text-sm font-medium">Показати ще</span>
      </Button>
    </Section>
  );
}
