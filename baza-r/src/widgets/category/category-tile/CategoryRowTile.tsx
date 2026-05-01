import { Link } from "react-router";
import type { Category } from "@/entities/category/model/Category";
import CustomLink from "@/shared/components/ui/CustomLink";
import placeholder from "@/shared/assets/images/placeholder.webp";

export function CategoryRowTile({ category }: { category: Category }) {
  return (
    <div className="flex h-full items-center gap-3 text-center">
      {category.imageUrl && (
        <Link
          to={`/catalog/${category.id}`}
          className="h-full max-h-15 lg:max-h-25"
        >
          <img
            src={category.imageUrl ?? placeholder}
            className="h-full w-full object-contain"
            onError={(e) => (e.currentTarget.src = placeholder)}
          />
        </Link>
      )}

      <CustomLink
        variant="primary"
        to={`/catalog/${category.id}`}
        className="w-full justify-center text-sm lg:text-base"
      >
        <span>{category.name}</span>
      </CustomLink>
    </div>
  );
}
