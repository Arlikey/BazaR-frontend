export type CategoryDto = {
  id: number;
  slug: string;
  name: string;
  icon_url: string | null;
  parent_id: number | null;
  sort_order: number;
  is_active: boolean;
};
