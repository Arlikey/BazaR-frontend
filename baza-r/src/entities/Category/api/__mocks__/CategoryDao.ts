import type { Category } from "../../model/Category";
import { mapCategory } from "../../model/map";
import type { CategoryDto } from "../CategoryDto";

const mock: CategoryDto[] = [
  {
    id: 1,
    slug: "laptops-computers",
    name: "Ноутбуки та комп'ютери",
    icon_url: "/icons/categories/computer.svg",
    parent_id: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: 2,
    slug: "phones-tv-electronics",
    name: "Смартфони, ТВ та електроніка",
    icon_url: "/icons/categories/smartphone.svg",
    parent_id: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: 3,
    slug: "game-zone",
    name: "Товари для геймерів",
    icon_url: "/icons/categories/game.svg",
    parent_id: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: 4,
    slug: "household-appliances",
    name: "Побутова техніка",
    icon_url: "/icons/categories/washing-machine.svg",
    parent_id: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: 5,
    slug: "for-home",
    name: "Товари для дому",
    icon_url: "/icons/categories/sofa.svg",
    parent_id: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: 6,
    slug: "instruments-car",
    name: "Інструменти та автотовари",
    icon_url: "/icons/categories/instrument.svg",
    parent_id: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: 7,
    slug: "plumbing-repairs",
    name: "Сантехніка та ремонт",
    icon_url: "/icons/categories/shower.svg",
    parent_id: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: 8,
    slug: "garden",
    name: "Дача, сад та город",
    icon_url: "/icons/categories/garden.svg",
    parent_id: null,
    sort_order: 1,
    is_active: true,
  },
];

export default class CategoryDao {
  static async getCategories(): Promise<Category[]> {
    await new Promise((r) => setTimeout(r, 3000));
    return mock.map(mapCategory);
  }
}
