import { ProductCardRich } from "../../../widgets/product-card/ProductCardRich";
import { toProduct } from "../../../entities/product/model/ProductListItem";
import { FiltersSidebar } from "../../../features/catalog-filters/ui/FiltersSidebar";
import { pluralize, PLURALS } from "../../../shared/lib/pluralize";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { useFilteredProducts } from "../../../entities/product/queries";
import { useCatalogFilters } from "../../../features/catalog-filters/model/useCatalogFilters";

type Props = {
  categoryId: string;
};

export function CategoryProductsSection({ categoryId }: Props) {
  const { filters, setFilters } = useCatalogFilters();
  const debouncedFilters = useDebounce(filters, 300);
  const { data: products, isLoading } = useFilteredProducts(
    categoryId!,
    debouncedFilters,
  );
  return (
    <div className="mt-8 flex flex-col gap-2.5">
      {isLoading && (
        <div className="fixed top-(--top-offset) left-0 z-50 h-full w-full bg-white/60" />
      )}
      <div
        data-app-filter
        className="sticky top-(--top-offset) z-25 bg-neutral-50 py-2 text-base"
      >
        <p>
          Знайдено <span className="tabular-nums">{products?.totalCount}</span>{" "}
          {pluralize(products?.totalCount!, PLURALS.product)}
        </p>
      </div>
      <div className="flex gap-2.5">
        <div className="sticky top-(--top-position) hidden h-full w-full max-w-71.25 self-start lg:flex">
          <FiltersSidebar
            categoryId={categoryId!}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        {isLoading && (
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-75 animate-pulse rounded-xl bg-neutral-100"
              />
            ))}
          </div>
        )}
        {!isLoading && products?.items.length === 0 && (
          <p className="text-neutral-400">Товарів не знайдено</p>
        )}
        {!isLoading && products?.items.length > 0 && (
          <div className="grid w-full h-fit grid-cols-2 gap-1 md:grid-cols-[repeat(auto-fill,minmax(285px,1fr))] lg:gap-2.5">
            {products.items.map((p) => (
              <ProductCardRich key={p.id} product={toProduct(p, categoryId!)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
