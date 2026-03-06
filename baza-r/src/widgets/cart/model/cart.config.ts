export type CartService = {
  id: string;
  label: string;
  price: number;
};

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  services?: CartService[];
};

export type CartBundle = {
  id: string;
  items: CartItem[];
  totalPrice: number;
};