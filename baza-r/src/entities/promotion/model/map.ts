import type { PromotionDto } from "../api/PromotionDto";
import type { Promotion } from "./Promotion";

export function mapPromotion(dto: PromotionDto): Promotion {
  return {
    id: dto.id,
    name: dto.name,
    imageUrl: dto.image_url,
    url: dto.url,
    isActive: dto.is_active,
  };
}
