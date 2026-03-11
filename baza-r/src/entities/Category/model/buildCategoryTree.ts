import type { Category } from "./Category";
import type { CategoryNode } from "./tree";

export function buildCategoryTree(categories: Category[]): CategoryNode[] {
  const byId = new Map<string, CategoryNode>();

  for (const c of categories) {
    byId.set(c.id, { ...c, children: [] });
  }

  const roots: CategoryNode[] = [];

  for (const c of categories) {
    const node = byId.get(c.id)!;

    if (c.parentId == null) {
      roots.push(node);
      continue;
    }

    const parent = byId.get(c.parentId);
    if (parent) parent.children.push(node);
    else roots.push(node);
  }

  return roots;
}
