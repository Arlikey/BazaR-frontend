import type { Category } from "./Category";

export type CategoryNode = Category & {
  children: CategoryNode[];
};
