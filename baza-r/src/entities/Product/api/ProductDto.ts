export type ProductDto = {
  id: number;
  category_id: number;
  name: string;

  image_url: string | null;

  old_price: number | null;
  current_price: number;

  is_active: boolean;
};
