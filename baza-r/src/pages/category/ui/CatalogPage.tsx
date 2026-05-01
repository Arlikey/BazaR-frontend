import { useCatalogCategories } from "../../../widgets/catalog/model/useCategories";
import { CategoryTile } from "../../../widgets/category/category-tile/CategoryTile";

export function CatalogPage() {
  const categories = useCatalogCategories();
  return (
    <div className="grid flex-1 auto-rows-[80px] grid-cols-2 gap-1 py-5 md:auto-rows-[120px] lg:grid-cols-[repeat(auto-fill,minmax(460px,1fr))]">
      {categories.roots.map((c) => (
        <CategoryTile
          key={c.id}
          category={c}
          variant="row"
          className="p-0! px-5! lg:px-15!"
        />
      ))}
    </div>
  );
}
