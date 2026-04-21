import { useParams, Navigate } from "react-router";
import { useCatalogCategories } from "../../../widgets/catalog/model/useCategories";
import { buildCategoryBreadcrumbs } from "../../../entities/category/model/buildBreadcrumbs";
import { Breadcrumbs } from "../../../shared/components/ui/Breadcrumbs";
import { CategoryPromoBanners } from "../../../widgets/category/promo-banners/CategoryPromoBanners";
import { SubcategoriesGrid } from "../../../widgets/category/category-grid/SubcategoriesGrid";
import { useElementOffset } from "../../../shared/hooks/useElementOffset";
import { CategoryProductsSection } from "./CategoryProductsSection";
export function CategoryPage() {
  const { categoryId } = useParams();
  const { flat, isLoading } = useCatalogCategories();

  const category = flat.find((c) => c.id === categoryId);
  const children = flat.filter((c) => c.parentId === categoryId);
  const hasChildren = children.length > 0;
  const breadcrumbs = buildCategoryBreadcrumbs(categoryId!, flat);
  useElementOffset({
    selector: "[data-app-filter]",
    cssVarName: "--top-position",
    measure: "bottom",
  });

  if (!isLoading && !category) return <Navigate to="/not-found" replace />;
  if (isLoading) return null;
  return (
    <div className="flex w-full flex-col">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-8 text-2xl font-medium md:text-4xl">
        {category!.name}
      </h1>
      <div className="flex flex-col gap-11">
        {hasChildren && <CategoryPromoBanners />}
        {hasChildren ? (
          <SubcategoriesGrid categoryId={categoryId!} />
        ) : (
          <CategoryProductsSection categoryId={categoryId} />
        )}
      </div>
    </div>
  );
}
