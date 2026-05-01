import { Link } from "react-router";
import type { Category } from "@/entities/category/model/Category";
import CustomLink from "@/shared/components/ui/CustomLink";
import { useCatalogCategories } from "../../catalog/model/useCategories";

export function CategoryListTile({ category }: { category: Category }) {
  const { flat } = useCatalogCategories();

  const sub = flat.filter((c) => c.parentId === category.id);

  return (
    <div className="flex h-full flex-col">
      {category.imageUrl && (
        <Link
          to={`/catalog/${category.id}`}
          className="mb-7.5 flex h-full max-h-30 w-full justify-center"
        >
          <img
            src={category.imageUrl}
            className="h-full w-3/4 object-contain"
            alt={category.name}
          />
        </Link>
      )}
      <CustomLink variant="primary" to={`/catalog/${category.id}`}>
        <span className="text-xl font-medium">{category.name}</span>
      </CustomLink>

      {sub.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1 text-base">
          {sub.map((s) => (
            <li key={s.id}>
              <CustomLink
                variant="primary"
                to={`/catalog/${s.id}`}
                className="w-full"
              >
                {s.name}
              </CustomLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
