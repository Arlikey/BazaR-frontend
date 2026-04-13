import { Link } from "react-router";
import type { Category } from "../../../entities/category/model/Category";
import CustomLink from "../../../shared/components/ui/CustomLink";
import { API_URL } from "../../../shared/config/env";

export function CategoryCenteredTile({ category }: { category: Category }) {
  return (
    <div className="flex h-full flex-col items-center gap-10 text-center">
      {category.imageUrl && (
        <Link to={`/catalog/${category.id}`} className="h-full max-h-30 w-full">
          <img
            src={`${API_URL}${category.imageUrl}`}
            className="h-full w-full object-contain"
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
