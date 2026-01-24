export type Category = {
  id: number;
  slug: string;
  name: string;

  description?: string | null;
  iconUrl?: string | null;

  parentId: number | null;
  sortOrder: number;
  isActive: boolean;
};
