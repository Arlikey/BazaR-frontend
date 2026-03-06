import { mapProduct } from "../../model/map";
import type { Product } from "../../model/Product";
import type { ProductDto } from "../ProductDto";

const trendingMock: ProductDto[] = [
  {
    id: 1,
    category_id: 1,
    name: "Ноутбук Lenovo IdeaPad 1 15AMN7 (82VG00RHRA) Cloud Grey / 15.6\" IPS / AMD Ryzen 3 7320U / RAM 16 ГБ / SSD 512 ГБ",
    image_url: "/images/products/original/551437411.png",
    old_price: 21999,
    current_price: 18999,
    is_active: true,
  },
  {
    id: 2,
    category_id: 2,
    name: "Ігрова приставка PS5 PlayStation 5 Digital Edition",
    image_url: "/images/products/playstation-5.png",
    old_price: null,
    current_price: 17899,
    is_active: true,
  },
  {
    id: 3,
    category_id: 3,
    name: "Кавомашина PHILIPS Series 2200 EP2235/40",
    image_url: "/images/products/philips-series-2200.png",
    old_price: null,
    current_price: 17499,
    is_active: true,
  },
  {
    id: 4,
    category_id: 4,
    name: "Фен Dyson Supersonic HD03 (фуксія)",
    image_url: "/images/products/dyson-supersonic.png",
    old_price: null,
    current_price: 14490,
    is_active: true,
  },
  {
    id: 5,
    category_id: 5,
    name: "Планшет Samsung Galaxy Tab S8 Ultra 5G 12/256 GB Graphite",
    image_url: "/images/products/samsung-galaxy-tab-s8.png",
    old_price: null,
    current_price: 43999,
    is_active: true,
  },
];

const recommendedMock: ProductDto[] = [
  {
    id: 6,
    category_id: 1,
    name: "Фен ROWENTA CV9820 Ultimate Experience",
    image_url: "/images/products/ROWENTA-CV9820-Ultimate-Experience.png",
    old_price: 9499,
    current_price: 6999,
    is_active: true,
  },
  {
    id: 7,
    category_id: 2,
    name: "Фен Philips серії 3000 BHD350/10",
    image_url: "/images/products/Philips-3000-BHD35010.png",
    old_price: null,
    current_price: 799,
    is_active: true,
  },
  {
    id: 8,
    category_id: 3,
    name: "Фен PHILIPS DryCare BHD274/00 ACmotor",
    image_url: "/images/products/PHILIPS-DryCare-BHD27400-ACmotor.png",
    old_price: 1594,
    current_price: 1494,
    is_active: true,
  },
  {
    id: 9,
    category_id: 4,
    name: "Фен PHILIPS 5000 series BHD530/00",
    image_url: "/images/products/PHILIPS-5000-series-BHD53000.png",
    old_price: null,
    current_price: 1799,
    is_active: true,
  },
  {
    id: 10,
    category_id: 5,
    name: "Фен Philips 5000 series BHD504/00",
    image_url: "/images/products/Philips-5000-series-BHD50400.png",
    old_price: null,
    current_price: 1099,
    is_active: true,
  },
];

const awaitedProducts: ProductDto[] = [
  {
    id: 11,
    category_id: 1,
    name: 'Ноутбук Apple MacBook Pro 16" M1 Max 1TB 2021 (MK1A3UA/A) Space Gray',
    image_url: "/images/products/Apple-MacBook-Pro-16.png",
    old_price: 136999,
    current_price: 122999,
    is_active: true,
    is_awaited: true,
  },
  {
    id: 12,
    category_id: 2,
    name: "Бездротовий геймпад PlayStation 5 Dualsense Purple для PS5/PS 5 Digital Edition",
    image_url: "/images/products/PlayStation-5-Dualsense-Purple.png",
    old_price: null,
    current_price: 2999,
    is_active: true,
    is_awaited: true,
  },
  {
    id: 14,
    category_id: 4,
    name: "Samsung The Freestyle (SP-LSP3BLAXUA)",
    image_url: "/images/products/Samsung-The-Freestyle.png",
    old_price: null,
    current_price: 26999,
    is_active: true,
    is_awaited: true,
  },
  {
    id: 13,
    category_id: 3,
    name: "Планшет Apple iPad mini 2021 Wi-Fi 256 GB Space Gray (MK7T3RK/A)",
    image_url: "/images/products/Apple-iPad-mini-2021.png",
    old_price: 25999,
    current_price: 23999,
    is_active: true,
    is_awaited: true,
  },
  {
    id: 15,
    category_id: 5,
    name: "Мобільний телефон Xiaomi Redmi Note 11 Pro+ 8/256GB Mysterious Black",
    image_url: "/images/products/Xiaomi-Redmi-Note-11.png",
    old_price: null,
    current_price: null,
    is_active: true,
    is_awaited: true,
  },
];

export default class ProductDao {
  static async getTrendingProducts(): Promise<Product[]> {
    await new Promise((r) => setTimeout(r, 700));
    return trendingMock.map(mapProduct);
  }

  static async getRecommendedProducts(): Promise<Product[]> {
    await new Promise((r) => setTimeout(r, 700));
    return recommendedMock.map(mapProduct);
  }

  static async getAwaitedProducts(): Promise<Product[]> {
    await new Promise((r) => setTimeout(r, 700));
    return awaitedProducts.map(mapProduct);
  }
}
