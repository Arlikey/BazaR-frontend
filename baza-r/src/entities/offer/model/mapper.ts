import type { Offer } from "./offer";
import type { OfferResponse } from "./offer.response";

export function toOffer(dto: OfferResponse): Offer {
  return {
    id: dto.offerId,
    productId: dto.productId,
    sellerId: dto.sellerId,

    price: {
      amount: dto.priceAmount,
      currency: dto.priceCurrency,
    },

    oldPrice: dto.oldPriceAmount
      ? {
          amount: dto.oldPriceAmount,
          currency: dto.priceCurrency,
        }
      : undefined,

    stock: dto.stock,
    sellerSku: dto.sellerSku,
    deliveryDays: dto.deliveryDays ?? undefined,
    minOrderQuantity: dto.minOrderQuantity,

    status: dto.status,
  };
}
