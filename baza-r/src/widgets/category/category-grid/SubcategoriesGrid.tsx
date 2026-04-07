import { useCatalogCategories } from "../../catalog/model/useCategories";
import { CategoryTile } from "../category-tile/CategoryTile";
import { CATEGORY_LAYOUTS } from "../config/categoryLayouts";

type Props = { categoryId: string };

export function SubcategoriesGrid({ categoryId }: Props) {
  const { flat } = useCatalogCategories();

  const layout = CATEGORY_LAYOUTS[categoryId] ?? CATEGORY_LAYOUTS.default;

  const children = flat
    .filter((c) => c.parentId === categoryId)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (!children.length) return null;

  return (
    <ul
      className={`grid h-full grid-flow-dense gap-3 ${layout.columns} ${layout.rowHeight}`}
    >
      {children.map((c) => (
        <li key={c.id} className={layout.defaultTile}>
          <CategoryTile variant={layout.tileVariant} category={c} />
        </li>
      ))}
    </ul>
  );
}
