export type CategoryDto = {
  id: string;
  name: string;
  parentCategoryId: string | null;
  sortOrder: number;
};