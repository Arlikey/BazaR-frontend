export type Category = {
  id: string;
  name: string;
  parentId: string | null;
  sortOrder: number;
  imageUrl: string | null;
};
