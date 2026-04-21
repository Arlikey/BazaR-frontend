import React from "react";
import { useSearchParams } from "react-router";
import { ProductsGrid } from "../../widgets/product-grid/ui/ProductGrid";
import { ProductCardCompact } from "../../widgets/product-card/ProductCardCompact";
import { toProduct } from "../../entities/product/model/ProductListItem";
import { useSearchProducts } from "./useSearchProducts";
import { pluralize, PLURALS } from "../../shared/lib/pluralize";
import { ProductCardRich } from "../../widgets/product-card/ProductCardRich";

export default function SearchPage() {
  const [params] = useSearchParams();

  const query = params.get("q") ?? "";

  const { data: products, isLoading } = useSearchProducts(query);

  const items = products?.items ?? [];

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="mt-8 text-2xl font-medium md:text-3xl">
        Результати пошуку «<span className="text-accent">{query}</span>»
      </h1>
      <div className="mt-8 flex flex-col gap-2.5">
        <div
          data-app-filter
          className="sticky top-(--top-offset) z-25 bg-neutral-50 py-2 text-base"
        >
          <p>
            Знайдено{" "}
            <span className="tabular-nums">{products?.totalCount}</span>{" "}
            {pluralize(products?.totalCount!, PLURALS.product)}
          </p>
        </div>
        <div className="flex gap-2.5">
          <div className="grid w-full grid-cols-2 gap-1 md:grid-cols-[repeat(auto-fill,minmax(285px,1fr))] lg:gap-2.5">
            {items.map((p) => (
              <ProductCardRich product={toProduct(p)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
