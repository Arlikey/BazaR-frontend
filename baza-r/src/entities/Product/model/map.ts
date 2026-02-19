import type { ProductDto } from "../api/ProductDto";
import type { Product } from "./Product";


export function mapProduct(dto: ProductDto): Product {
  return {
    id: dto.id,
    categoryId: dto.category_id,
    name: dto.name,
    imageUrl: dto.image_url ?? null,
    oldPrice: dto.old_price ?? null,
    currentPrice: dto.current_price ?? null,
    isActive: dto.is_active,
    isAwaited: dto.is_awaited ?? null,
  };
}
