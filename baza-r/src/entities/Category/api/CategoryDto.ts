export type CategoryDto = {
  id: string;
  name: string;
  parentCategoryId: string | null;
  sortOrder: number;
  imageUrl: string | null;
  tileSize: string | undefined;
};
