import { useParams, Navigate } from "react-router";
import { useCatalogCategories } from "../../../widgets/catalog/model/useCategories";
import { toProduct } from "../../../entities/product/model/ProductListItem";
import { ProductCardRich } from "../../../widgets/product-card/ProductCardRich";
import Block from "../../../shared/components/ui/Block";
import { useProductsByCategory } from "../../../entities/product/queries";
import { buildCategoryBreadcrumbs } from "../../../entities/category/model/buildBreadcrumbs";
import { Breadcrumbs } from "../../../shared/components/ui/Breadcrumbs";
import { CategoryPromoBanners } from "../../../widgets/category/promo-banners/CategoryPromoBanners";
import { SubcategoriesGrid } from "../../../widgets/category/category-grid/SubcategoriesGrid";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { flat, isLoading: categoriesLoading } = useCatalogCategories();

  const category = flat.find((c) => c.id === categoryId);
  const children = flat.filter((c) => c.parentId === categoryId);
  const hasChildren = children.length > 0;
  const breadcrumbs = buildCategoryBreadcrumbs(categoryId!, flat);

  const { data: products = [], isLoading: productsLoading } =
    useProductsByCategory(!hasChildren ? categoryId : undefined);

  if (!categoriesLoading && !category)
    return <Navigate to="/not-found" replace />;
  if (categoriesLoading) return null;

  return (
    <div className="flex w-full flex-col">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-8 text-2xl md:text-4xl font-medium">{category!.name}</h1>

      <div className="flex flex-col gap-11">
        {hasChildren && <CategoryPromoBanners />}

        {hasChildren ? (
          <SubcategoriesGrid categoryId={categoryId!} />
        ) : (
          <div className="mt-10 flex gap-2.5">
            <Block className="hidden w-71.25 items-center justify-center text-neutral-500 lg:flex">
              Filters Placeholder
            </Block>
            {productsLoading && (
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-75 animate-pulse rounded-xl bg-neutral-100"
                  />
                ))}
              </div>
            )}
            {!productsLoading && products.length === 0 && (
              <p className="text-neutral-400">Товарів не знайдено</p>
            )}
            {!productsLoading && products.length > 0 && (
              <div className="grid w-full grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(285px,1fr))] gap-1 lg:gap-2.5">
                {products.map((p) => (
                  <ProductCardRich
                    key={p.id}
                    product={toProduct(p, categoryId!)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
