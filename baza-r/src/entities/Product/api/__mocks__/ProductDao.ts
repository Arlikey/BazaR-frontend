import { mapProduct } from "../../model/map";
import type { Product } from "../../model/Product";
import type { ProductDto } from "../ProductDto";


const mock: ProductDto[] = [
  {
    id: 1,
    category_id: 1,
    name: "Мобільний телефон Apple iPhone 13 Pro Max 256 GB Sierra Blue",
    image_url: "/images/products/iphone-13-pro-max.png",
    old_price: 47499,
    current_price: 46499,
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
  {
    id: 5,
    category_id: 5,
    name: "Планшет Samsung Galaxy Tab S8 Ultra 5G 12/256 GB Graphite",
    image_url: "",
    old_price: null,
    current_price: 43999,
    is_active: true,
  },
];

export default class ProductDao {
  static async getProducts(): Promise<Product[]> {
    await new Promise((r) => setTimeout(r, 700));
    return mock.map(mapProduct);
  }
}
