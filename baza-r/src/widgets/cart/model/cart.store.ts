import { create } from "zustand";
import type { CartItem } from "./cart.config";

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [
    {
      id: "1",
      name: "Ноутбук Lenovo Yoga 7 14ACN6 (82N7009RRA) Slate Grey",
      image: "/images/products/Apple-MacBook-Pro-16.png",
      price: 35555,
      oldPrice: 39999,
      quantity: 1,
      services: [
        { id: "s1", label: "Подовження гарантії на 1 рік", price: 499 },
        { id: "s2", label: "Дистанційне налаштування", price: 299 },
      ],
    },
    {
      id: "2",
      name: "Кігтеточка Supretto для кішок з будиночком і лежанкою Бежева",
      image: "/images/products/samsung-galaxy-tab-s8.png",
      price: 1000,
      quantity: 1,
    },
  ],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),

  clearCart: () => set({ items: [] }),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
