import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z.number().min(1, "Необхідно виставити оцінку"),

  comment: z.string().min(5, "Коментар повинен містити хоча б 5 символів"),

  advantages: z.string().optional(),
  disadvantages: z.string().optional(),

  name: z.string().min(2, "Вкажіть ім'я"),

  email: z.string().email("Некоректна електронна пошта"),

  images: z
    .array(z.instanceof(File))
    .max(10, "Максимум 10 зображень")
    .optional(),
});

export type CreateReviewFormValues = z.infer<typeof createReviewSchema>;
