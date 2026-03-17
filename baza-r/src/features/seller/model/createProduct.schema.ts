import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Мінімум 2 символи"),
  categoryId: z.string().min(1, "Оберіть категорію"),
  description: z.string().optional(),
  brandId: z.string().optional(),
  vendorCode: z.string().optional(),
  barcode: z.string().optional(),
  slug: z.string().min(2, "Slug обов'язковий"),
  attributes: z.array(
    z.object({
      attributeId: z.string(),
      textValue: z.string().optional(),
      numberValue: z.number().optional(),
      boolValue: z.boolean().optional(),
      optionId: z.string().optional(),
      optionIds: z.array(z.string()).optional(),
    })
  ).default([]),
  images: z.array(z.instanceof(File)).default([]),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;