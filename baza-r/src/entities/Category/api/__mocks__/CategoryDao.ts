import type { Category } from "../../model/Category";
import { mapCategory } from "../../model/map";
import type { CategoryDto } from "../CategoryDto";

const mock: CategoryDto[] = [
  // ====== LEVEL 1 (root) ======
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
    sort_order: 2,
    is_active: true,
  },
  {
    id: 3,
    slug: "game-zone",
    name: "Товари для геймерів",
    icon_url: "/icons/categories/game.svg",
    parent_id: null,
    sort_order: 3,
    is_active: true,
  },
  {
    id: 4,
    slug: "household-appliances",
    name: "Побутова техніка",
    icon_url: "/icons/categories/washing-machine.svg",
    parent_id: null,
    sort_order: 4,
    is_active: true,
  },
  {
    id: 5,
    slug: "for-home",
    name: "Товари для дому",
    icon_url: "/icons/categories/sofa.svg",
    parent_id: null,
    sort_order: 5,
    is_active: true,
  },
  {
    id: 6,
    slug: "instruments-car",
    name: "Інструменти та автотовари",
    icon_url: "/icons/categories/instrument.svg",
    parent_id: null,
    sort_order: 6,
    is_active: true,
  },
  {
    id: 7,
    slug: "plumbing-repairs",
    name: "Сантехніка та ремонт",
    icon_url: "/icons/categories/shower.svg",
    parent_id: null,
    sort_order: 7,
    is_active: true,
  },
  {
    id: 8,
    slug: "garden",
    name: "Дача, сад та город",
    icon_url: "/icons/categories/garden.svg",
    parent_id: null,
    sort_order: 8,
    is_active: true,
  },
  {
    id: 9,
    slug: "sport-hobby",
    name: "Спорт та захоплення",
    icon_url: "/icons/categories/sport.svg",
    parent_id: null,
    sort_order: 9,
    is_active: true,
  },
  {
    id: 10,
    slug: "clothes-shoes-jewelry",
    name: "Одяг, взуття та прикраси",
    icon_url: "/icons/categories/clothes.svg",
    parent_id: null,
    sort_order: 10,
    is_active: true,
  },
  {
    id: 11,
    slug: "beauty-health",
    name: "Краса і здоров'я",
    icon_url: "/icons/categories/beauty.svg",
    parent_id: null,
    sort_order: 11,
    is_active: true,
  },
  {
    id: 12,
    slug: "kids",
    name: "Дитячі товари",
    icon_url: "/icons/categories/puzzle.svg",
    parent_id: null,
    sort_order: 12,
    is_active: true,
  },
  {
    id: 13,
    slug: "pets",
    name: "Зоотовари",
    icon_url: "/icons/categories/paws.svg",
    parent_id: null,
    sort_order: 13,
    is_active: true,
  },
  {
    id: 14,
    slug: "office-books",
    name: "Канцтовари та книги",
    icon_url: "/icons/categories/books.svg",
    parent_id: null,
    sort_order: 14,
    is_active: true,
  },
  {
    id: 15,
    slug: "food-drinks",
    name: "Алкогольні напої та продукти",
    icon_url: "/icons/categories/champagne.svg",
    parent_id: null,
    sort_order: 15,
    is_active: true,
  },
  {
    id: 16,
    slug: "business",
    name: "Товари для бізнесу та послуги",
    icon_url: "/icons/categories/code.svg",
    parent_id: null,
    sort_order: 16,
    is_active: true,
  },
  {
    id: 17,
    slug: "travel",
    name: "Тури та відпочинок",
    icon_url: "/icons/categories/relax.svg",
    parent_id: null,
    sort_order: 17,
    is_active: true,
  },
  {
    id: 18,
    slug: "promotions",
    name: "Акції",
    icon_url: "/icons/categories/offer.svg",
    parent_id: null,
    sort_order: 18,
    is_active: true,
  },
  {
    id: 19,
    slug: "total-sale",
    name: "Тотальний розпродаж",
    icon_url: "/icons/categories/sale.svg",
    parent_id: null,
    sort_order: 19,
    is_active: true,
  },

  // =========================================================
  // ====== LEVEL 2 (children of 5: for-home)  [ЗЕЛЁНЫЕ] ======
  // =========================================================

  // Декор для дому (на макете без листьев)
  {
    id: 500,
    slug: "home-decor",
    name: "Декор для дому",
    icon_url: null,
    parent_id: 5,
    sort_order: 1,
    is_active: true,
  },

  // Меблі
  {
    id: 501,
    slug: "furniture",
    name: "Меблі",
    icon_url: null,
    parent_id: 5,
    sort_order: 2,
    is_active: true,
  },

  // Домашній текстиль
  {
    id: 502,
    slug: "home-textile",
    name: "Домашній текстиль",
    icon_url: null,
    parent_id: 5,
    sort_order: 3,
    is_active: true,
  },

  // Системи охорони і безпеки
  {
    id: 504,
    slug: "security-systems",
    name: "Системи охорони і безпеки",
    icon_url: null,
    parent_id: 5,
    sort_order: 4,
    is_active: true,
  },

  // Посуд
  {
    id: 503,
    slug: "dishes",
    name: "Посуд",
    icon_url: null,
    parent_id: 5,
    sort_order: 5,
    is_active: true,
  },

  // Інвентар для дому та офісу
  {
    id: 505,
    slug: "home-office-supplies",
    name: "Інвентар для дому та офісу",
    icon_url: null,
    parent_id: 5,
    sort_order: 6,
    is_active: true,
  },

  // Господарські товари
  {
    id: 506,
    slug: "household-goods",
    name: "Господарські товари",
    icon_url: null,
    parent_id: 5,
    sort_order: 7,
    is_active: true,
  },

  // Каміни, печі, сауни (без листьев)
  {
    id: 507,
    slug: "fireplaces-stoves-saunas",
    name: "Каміни, печі, сауни",
    icon_url: null,
    parent_id: 5,
    sort_order: 8,
    is_active: true,
  },

  // Побутова хімія
  {
    id: 508,
    slug: "household-chemicals",
    name: "Побутова хімія",
    icon_url: null,
    parent_id: 5,
    sort_order: 9,
    is_active: true,
  },

  // Освітлення
  {
    id: 509,
    slug: "lighting",
    name: "Освітлення",
    icon_url: null,
    parent_id: 5,
    sort_order: 10,
    is_active: true,
  },

  // Лічильники
  {
    id: 510,
    slug: "meters",
    name: "Лічильники",
    icon_url: null,
    parent_id: 5,
    sort_order: 11,
    is_active: true,
  },

  // Годинники
  {
    id: 511,
    slug: "clocks",
    name: "Годинники",
    icon_url: null,
    parent_id: 5,
    sort_order: 12,
    is_active: true,
  },

  // Килими (без листьев)
  {
    id: 512,
    slug: "carpets",
    name: "Килими",
    icon_url: null,
    parent_id: 5,
    sort_order: 13,
    is_active: true,
  },

  // Знижені в ціні товари (без листьев)
  {
    id: 513,
    slug: "discounted-items",
    name: "Знижені в ціні товари",
    icon_url: null,
    parent_id: 5,
    sort_order: 14,
    is_active: true,
  },

  // =========================================================
  // ====== LEVEL 3 (children of level-2) [ЧЁРНЫЕ] ============
  // =========================================================

  // --- Меблі (501) ---
  { id: 5011, slug: "chairs", name: "Крісла", icon_url: null, parent_id: 501, sort_order: 1, is_active: true },
  { id: 5012, slug: "computer-tables", name: "Комп'ютерні столи", icon_url: null, parent_id: 501, sort_order: 2, is_active: true },
  { id: 5013, slug: "stools-and-chairs", name: "Стільці та табурети", icon_url: null, parent_id: 501, sort_order: 3, is_active: true },
  { id: 5014, slug: "frameless-furniture", name: "Безкаркасні меблі", icon_url: null, parent_id: 501, sort_order: 4, is_active: true },
  { id: 5015, slug: "garden-furniture", name: "Садові меблі", icon_url: null, parent_id: 501, sort_order: 5, is_active: true },

  // --- Домашній текстиль (502) ---
  { id: 5021, slug: "bed-linen", name: "Постільна білизна", icon_url: null, parent_id: 502, sort_order: 1, is_active: true },
  { id: 5022, slug: "mattresses", name: "Матраци", icon_url: null, parent_id: 502, sort_order: 2, is_active: true },
  { id: 5023, slug: "blankets", name: "Ковдри", icon_url: null, parent_id: 502, sort_order: 3, is_active: true },
  { id: 5024, slug: "pillows", name: "Подушки", icon_url: null, parent_id: 502, sort_order: 4, is_active: true },
  { id: 5025, slug: "mattress-toppers", name: "Наматрацники та підматрацники", icon_url: null, parent_id: 502, sort_order: 5, is_active: true },
  { id: 5026, slug: "plaids", name: "Пледи", icon_url: null, parent_id: 502, sort_order: 6, is_active: true },
  { id: 5027, slug: "towels", name: "Рушники", icon_url: null, parent_id: 502, sort_order: 7, is_active: true },
  { id: 5028, slug: "bedspreads", name: "Покривала", icon_url: null, parent_id: 502, sort_order: 8, is_active: true },

  // --- Системи охорони і безпеки (504) ---
  { id: 5041, slug: "intercoms", name: "Домофони", icon_url: null, parent_id: 504, sort_order: 1, is_active: true },
  { id: 5042, slug: "cctv-kits", name: "Комплекти відеоспостереження", icon_url: null, parent_id: 504, sort_order: 2, is_active: true },
  { id: 5043, slug: "alarm-kits", name: "Комплекти сигналізацій", icon_url: null, parent_id: 504, sort_order: 3, is_active: true },
  { id: 5044, slug: "dvr", name: "Відеомагнітофони", icon_url: null, parent_id: 504, sort_order: 4, is_active: true },
  { id: 5045, slug: "voltage-stabilizers", name: "Стабілізатори напруги", icon_url: null, parent_id: 504, sort_order: 5, is_active: true },
  { id: 5046, slug: "inverters", name: "Інвертори", icon_url: null, parent_id: 504, sort_order: 6, is_active: true },

  // --- Посуд (503) ---
  { id: 5031, slug: "cooking", name: "Для приготування їжі", icon_url: null, parent_id: 503, sort_order: 1, is_active: true },
  { id: 5032, slug: "serving", name: "Посуд для сервірування", icon_url: null, parent_id: 503, sort_order: 2, is_active: true },
  { id: 5033, slug: "kitchen-accessories", name: "Кухонні аксесуари", icon_url: null, parent_id: 503, sort_order: 3, is_active: true },
  { id: 5034, slug: "knives-utensils", name: "Кухонні ножі та приладдя", icon_url: null, parent_id: 503, sort_order: 4, is_active: true },
  { id: 5035, slug: "storage-packaging", name: "Зберігання та пакування", icon_url: null, parent_id: 503, sort_order: 5, is_active: true },

  // --- Інвентар для дому та офісу (505) ---
  { id: 5051, slug: "laundry-ironing", name: "Прання та прасування", icon_url: null, parent_id: 505, sort_order: 1, is_active: true },
  { id: 5052, slug: "cleaning-tools", name: "Інструменти для прибирання", icon_url: null, parent_id: 505, sort_order: 2, is_active: true },
  { id: 5053, slug: "storage-organization", name: "Зберігання та організація простору", icon_url: null, parent_id: 505, sort_order: 3, is_active: true },
  { id: 5054, slug: "buckets-baskets", name: "Відра та корзини", icon_url: null, parent_id: 505, sort_order: 4, is_active: true },
  { id: 5055, slug: "household-inventory", name: "Господарський інвентар", icon_url: null, parent_id: 505, sort_order: 5, is_active: true },
  { id: 5056, slug: "ladders", name: "Драбини", icon_url: null, parent_id: 505, sort_order: 6, is_active: true },

  // --- Господарські товари (506) ---
  { id: 5061, slug: "trash-bags", name: "Пакети для сміття", icon_url: null, parent_id: 506, sort_order: 1, is_active: true },
  { id: 5062, slug: "gloves", name: "Рукавички", icon_url: null, parent_id: 506, sort_order: 2, is_active: true },

  // --- Побутова хімія (508) ---
  { id: 5081, slug: "laundry-detergents", name: "Засоби для прання", icon_url: null, parent_id: 508, sort_order: 1, is_active: true },
  { id: 5082, slug: "dishwasher-detergents", name: "Засоби для посудомийних машин", icon_url: null, parent_id: 508, sort_order: 2, is_active: true },
  { id: 5083, slug: "bathroom-cleaners", name: "Засоби для чищення ванн", icon_url: null, parent_id: 508, sort_order: 3, is_active: true },
  { id: 5084, slug: "fabric-softeners", name: "Кондиціонери для білизни", icon_url: null, parent_id: 508, sort_order: 4, is_active: true },
  { id: 5085, slug: "appliance-care", name: "Засоби для догляду за побутовою технікою", icon_url: null, parent_id: 508, sort_order: 5, is_active: true },

  // --- Освітлення (509) ---
  { id: 5091, slug: "bulbs", name: "Лампочки", icon_url: null, parent_id: 509, sort_order: 1, is_active: true },
  { id: 5092, slug: "desk-lamps", name: "Настільні лампи", icon_url: null, parent_id: 509, sort_order: 2, is_active: true },
  { id: 5093, slug: "chandeliers", name: "Люстри", icon_url: null, parent_id: 509, sort_order: 3, is_active: true },
  { id: 5094, slug: "outdoor-lighting", name: "Вуличне освітлення", icon_url: null, parent_id: 509, sort_order: 4, is_active: true },
  { id: 5095, slug: "wall-lights", name: "Настінні світильники", icon_url: null, parent_id: 509, sort_order: 5, is_active: true },
  { id: 5096, slug: "ceiling-lights", name: "Стельові світильники", icon_url: null, parent_id: 509, sort_order: 6, is_active: true },
  { id: 5097, slug: "spotlights", name: "Точкові світильники", icon_url: null, parent_id: 509, sort_order: 7, is_active: true },
  { id: 5098, slug: "led-garlands", name: "Світлодіодні гірлянди", icon_url: null, parent_id: 509, sort_order: 8, is_active: true },

  // --- Лічильники (510) ---
  { id: 5101, slug: "surge-protection", name: "Захист від перепадів напруги", icon_url: null, parent_id: 510, sort_order: 1, is_active: true },
  { id: 5102, slug: "water-meters", name: "Лічильники води", icon_url: null, parent_id: 510, sort_order: 2, is_active: true },
  { id: 5103, slug: "gas-meters", name: "Лічильники газу", icon_url: null, parent_id: 510, sort_order: 3, is_active: true },
  { id: 5104, slug: "electricity-meters", name: "Лічильники електроенергії", icon_url: null, parent_id: 510, sort_order: 4, is_active: true },

  // --- Годинники (511) ---
  { id: 5111, slug: "wall-clocks", name: "Настінні годинники", icon_url: null, parent_id: 511, sort_order: 1, is_active: true },
  { id: 5112, slug: "desk-clocks", name: "Настільні годинники", icon_url: null, parent_id: 511, sort_order: 2, is_active: true },
  { id: 5113, slug: "floor-clocks", name: "Підлогові годинники", icon_url: null, parent_id: 511, sort_order: 3, is_active: true },
];

export default class CategoryDao {
  static async getCategories(): Promise<Category[]> {
    await new Promise((r) => setTimeout(r, 700));
    return mock.map(mapCategory);
  }
}
