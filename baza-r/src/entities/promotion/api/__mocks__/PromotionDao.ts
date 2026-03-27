import { mapPromotion } from "../../model/map";
import type { Promotion } from "../../model/Promotion";
import type { PromotionDto } from "../PromotionDto";

const activePromotions: PromotionDto[] = [
  {
    id: 1,
    name: "Galaxy S22 Ultra Promo Banner",
    image_url: "/images/action-banners/galaxy-s22-ultra-banner.webp",
    url: "/promo/1",
    is_active: true,
  },
  {
    id: 2,
    name: "Beko Washing Machine Promo Banner",
    image_url: "/images/action-banners/beko-washing-machine-banner.webp",
    url: "/promo/2",
    is_active: true,
  },
  {
    id: 3,
    name: "Disney Clothes Promo Banner",
    image_url: "/images/action-banners/disney-clothes-banner.webp",
    url: "/promo/3",
    is_active: true,
  },
];

export default class PromotionDao {
  static async getPromotions(): Promise<Promotion[]> {
    await new Promise((r) => setTimeout(r, 700));
    return activePromotions.map(mapPromotion);
  }
}
