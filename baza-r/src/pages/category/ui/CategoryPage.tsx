import { useParams, Navigate, useNavigate } from "react-router";
import { useCatalogCategories } from "../../../widgets/catalog/model/useCategories";
import { ProductCardCompact } from "../../../widgets/product-card/ProductCardCompact";
import { toProduct } from "../../../entities/product/model/ProductListItem";
import { ProductCardRich } from "../../../widgets/product-card/ProductCardRich";
import IconWrapper from "../../../shared/components/ui/IconWrapper";
import { CartIcon } from "../../../shared/components/icons/ui/CartIcon";
import { Button } from "../../../shared/components/ui/Button";
import Block from "../../../shared/components/ui/Block";
import { useProductsByCategory } from "../../../entities/product/queries";
import { StarIcon } from "../../../shared/components/icons/ui/StarIcon";
import { StarRating } from "../../../widgets/product-details/ui/blocks/review-block/ReviewCard";
import { buildCategoryBreadcrumbs } from "../../../entities/category/model/buildBreadcrumbs";
import { Breadcrumbs } from "../../../shared/components/ui/Breadcrumbs";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
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
    <div className="flex w-full flex-col gap-8">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="text-4xl font-medium">{category!.name}</h1>

      {hasChildren ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {children
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/catalog/${c.id}`)}
                className="hover:border-accent hover:text-accent flex flex-col items-center gap-2 rounded-xl border border-neutral-100 bg-white p-4 text-center text-xl font-medium transition-colors"
              >
                <span>{c.name}</span>
              </button>
            ))}
        </div>
      ) : (
        <div className="flex gap-2.5">
          <Block>
            <aside className="h-60 w-[285px]"></aside>
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
            <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(285px,1fr))] gap-2.5">
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
  );
};

export default CategoryPage;
