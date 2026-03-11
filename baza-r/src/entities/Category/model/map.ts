import type { CategoryDto } from "../api/CategoryDto";
import type { Category } from "./Category";

export function mapCategory(dto: CategoryDto): Category {
  return {
    id: dto.id,
    name: dto.name,
    parentId: dto.parentCategoryId,
    sortOrder: dto.sortOrder,
  };
}