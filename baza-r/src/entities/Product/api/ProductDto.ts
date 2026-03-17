export type ProductDto = {
  id: string;
  category_id: number;
  name: string;

  image_url: string | null;

  old_price: number | null;
  current_price: number | null;

  is_active: boolean;
  is_awaited?: boolean | null;
};
