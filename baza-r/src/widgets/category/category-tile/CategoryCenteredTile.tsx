import { Link } from "react-router";
import type { Category } from "../../../entities/category/model/Category";
import CustomLink from "../../../shared/components/ui/CustomLink";
import placeholder from "../../../shared/assets/images/placeholder.webp";

export function CategoryCenteredTile({ category }: { category: Category }) {
  return (
    <div className="flex h-full flex-col items-center gap-10 text-center">
      {category.imageUrl && (
        <Link to={`/catalog/${category.id}`} className="h-full max-h-30 w-full">
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
        className="w-full justify-center"
      >
        <span className="font-medium">{category.name}</span>
      </CustomLink>
    </div>
  );
}
