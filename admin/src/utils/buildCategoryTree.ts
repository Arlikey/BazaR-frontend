import type { Category } from "@api/categoryApi";

export type CategoryNode = Category & {
  children: CategoryNode[];
};

export function buildCategoryTree(categories: Category[]): CategoryNode[] {
  const byId = new Map<string, CategoryNode>();

  for (const c of categories) {
    byId.set(c.id, { ...c, children: [] });
  }

  const roots: CategoryNode[] = [];

  for (const c of categories) {
    const node = byId.get(c.id)!;

    if (c.parentCategoryId == null) {
      roots.push(node);
      continue;
    }

    const parent = byId.get(c.parentCategoryId);
    if (parent) parent.children.push(node);
    else roots.push(node);
  }

  return roots;
}
