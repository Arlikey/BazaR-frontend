import type { CategoryDto } from "../api/CategoryDto";
import type { Category } from "./Category";

export function mapCategory(dto: CategoryDto): Category {
  return {
    id: dto.id,
    slug: dto.slug,
    name: dto.name,
    iconUrl: dto.icon_url ?? null,
    parentId: dto.parent_id,
    sortOrder: dto.sort_order,
    isActive: dto.is_active,
  };
}
