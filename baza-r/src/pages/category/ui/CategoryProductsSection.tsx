import { ProductCardRich } from "../../../widgets/product-card/ProductCardRich";
import { toProduct } from "../../../entities/product/model/ProductListItem";
import { FiltersSidebar } from "../../../features/catalog-filters/ui/FiltersSidebar";
import { pluralize, PLURALS } from "../../../shared/lib/pluralize";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { useFilteredProducts } from "../../../entities/product/queries";
import { useCatalogFilters } from "../../../features/catalog-filters/model/useCatalogFilters";
import { Pagination } from "../../../widgets/pagination/Pagination";
import { PAGE_SIZE } from "../../../shared/model/constants";

type Props = {
  categoryId: string;
};

export function CategoryProductsSection({ categoryId }: Props) {
  const { filters, setFilters, setFiltersAndReset } = useCatalogFilters();
  const debouncedFilters = useDebounce(filters, 300);
  const {
    data: products,
    isLoading,
    isFetching,
  } = useFilteredProducts(categoryId, debouncedFilters);

  const totalPages = Math.ceil((products?.totalCount ?? 0) / PAGE_SIZE);

  function handlePageChange(page: number) {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const items = products?.items ?? [];
  return (
    <div className="mt-8 flex flex-col gap-2.5">
      {isFetching && (
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
            setFilters={setFiltersAndReset}
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
        {!isLoading && items.length === 0 && (
          <p className="text-neutral-400">Товарів не знайдено</p>
        )}
        {!isLoading && items.length > 0 && (
          <div className="flex flex-1 flex-col gap-15">
            <div className="grid h-fit w-full grid-cols-2 gap-1 md:grid-cols-[repeat(auto-fill,minmax(285px,1fr))] lg:gap-2.5">
              {items.map((p) => (
                <ProductCardRich
                  key={p.id}
                  product={toProduct(p, categoryId!)}
                />
              ))}
            </div>
            <Pagination
              page={filters.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
