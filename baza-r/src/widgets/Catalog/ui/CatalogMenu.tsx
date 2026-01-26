import { CategoryItem } from "../../../entities/Category/ui/CategoryItem";
import { ArrowIcon } from "../../../shared/components/icons/ui";
import { useCategories } from "../model/useCategories";

export default function CatalogMenu() {
  const { categories, error, isLoading } = useCategories();

  if (error) return <p className="text-error">Failed to load categories</p>;
  if (isLoading) return <p>Loading...</p>;
  if (categories.length === 0) return <p>No categories</p>;

  return (
    <nav className="bg-on-light border-thin max-w-81.25 rounded-xl border-neutral-100 px-6 py-3">
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryItem
              category={category}
              to={`/catalog/${category.slug}`}
              intent="hoverable"
              className="rounded-sm"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
