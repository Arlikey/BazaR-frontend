import { useCatalogCategories } from "../../catalog/model/useCategories";
import { CategoryTile } from "../category-tile/CategoryTile";

type Props = { categoryId: string };

export function SubcategoriesGrid({ categoryId }: Props) {
  const { flat } = useCatalogCategories();

  const children = flat
    .filter((c) => c.parentId === categoryId)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (!children.length) return null;

  return (
    <ul className="grid h-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {children.map((c) => (
        <li key={c.id}>
          <CategoryTile variant={"centered"} category={c} />
        </li>
      ))}
    </ul>
  );
}
