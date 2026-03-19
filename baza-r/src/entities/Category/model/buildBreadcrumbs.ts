import type { BreadcrumbItem } from "../../../shared/components/ui/Breadcrumbs";
import type { Category } from "./Category";

export function buildCategoryBreadcrumbs(
  categoryId: string | undefined,
  categories: Category[],
): BreadcrumbItem[] {
  if (!categoryId) return [];
  const chain: Category[] = [];
  let current: string | null = categoryId;

  while (current) {
    const cat = categories.find((c) => c.id === current);
    if (!cat) break;
    chain.unshift(cat);
    current = cat.parentId;
  }

  return chain.map((c) => ({
    label: c.name,
    to: `/catalog/${c.id}`,
  }));
}
