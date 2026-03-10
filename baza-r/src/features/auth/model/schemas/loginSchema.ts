import * as z from "zod";
import { emailSchema, passwordSchema, uaPhoneSchema } from "../userValidation";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Введіть ел. пошту або телефон"),
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
