import { useParams, Navigate } from "react-router";
import { useCatalogCategories } from "../../../widgets/catalog/model/useCategories";
import { toProduct } from "../../../entities/product/model/ProductListItem";
import { ProductCardRich } from "../../../widgets/product-card/ProductCardRich";
import { useFilteredProducts } from "../../../entities/product/queries";
import { buildCategoryBreadcrumbs } from "../../../entities/category/model/buildBreadcrumbs";
import { Breadcrumbs } from "../../../shared/components/ui/Breadcrumbs";
import { CategoryPromoBanners } from "../../../widgets/category/promo-banners/CategoryPromoBanners";
import { SubcategoriesGrid } from "../../../widgets/category/category-grid/SubcategoriesGrid";
import { CatalogFilters } from "../../../features/catalog-filters/ui/CatalogFilters";
import { useCatalogFilters } from "../../../features/catalog-filters/model/useCatalogFilters";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { useElementOffset } from "../../../shared/hooks/useElementOffset";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { flat, isLoading: categoriesLoading } = useCatalogCategories();
  const { filters, setFilters } = useCatalogFilters();

  const category = flat.find((c) => c.id === categoryId);
  const children = flat.filter((c) => c.parentId === categoryId);
  const hasChildren = children.length > 0;
  const breadcrumbs = buildCategoryBreadcrumbs(categoryId!, flat);

  useElementOffset({
    selector: "[data-app-filter]",
    cssVarName: "--top-position",
    measure: "bottom",
  });

  const debouncedFilters = useDebounce(filters, 300);

  const { data: products, isLoading } = useFilteredProducts(
    categoryId!,
    debouncedFilters,
  );

  if (!categoriesLoading && !category)
    return <Navigate to="/not-found" replace />;
  if (categoriesLoading) return null;

  console.log(products);

  return (
    <div className="flex w-full flex-col">
      {isLoading && (
        <div className="fixed top-(--top-offset) left-0 z-99 h-full w-full bg-white/60" />
      )}
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-8 text-2xl font-medium md:text-4xl">
        {category!.name}
      </h1>

      <div className="flex flex-col gap-11">
        {hasChildren && <CategoryPromoBanners />}

        {hasChildren ? (
          <SubcategoriesGrid categoryId={categoryId!} />
        ) : (
          <div className="mt-8 flex flex-col gap-2.5">
            <div
              data-app-filter
              className="sticky top-(--top-offset) z-50 bg-neutral-50 py-2 text-base"
            >
              <p>
                Знайдено{" "}
                <span className="tabular-nums">{products?.totalCount}</span>{" "}
                товарів
              </p>
            </div>
            <div className="flex gap-2.5">
              <div className="sticky top-(--top-position) hidden w-full max-w-71.25 self-start lg:flex">
                <CatalogFilters
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
                <div className="grid w-full grid-cols-2 gap-1 md:grid-cols-[repeat(auto-fill,minmax(285px,1fr))] lg:gap-2.5">
                  {products.items.map((p) => (
                    <ProductCardRich
                      key={p.id}
                      product={toProduct(p, categoryId!)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
