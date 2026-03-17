import { z } from "zod";

export const createOfferSchema = z.object({
  priceAmount: z
    .number({ error: "Введіть ціну" })
    .positive("Ціна має бути більше 0"),
  oldPriceAmount: z.number().positive().optional(),
  stock: z.number({ error: "Введіть кількість" }).int().min(0),
  sellerSku: z.string().optional(),
  deliveryDays: z.number().int().min(1).optional(),
  minOrderQuantity: z.number().int().min(1).optional(),
  activate: z.boolean().default(true),
});

export type CreateOfferFormData = z.infer<typeof createOfferSchema>;
