import * as z from "zod";
import {
  emailSchema,
  passwordSchema,
  uaPhoneSchema,
} from "../userValidation";

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Введіть ел. пошту або телефон")
    .superRefine((value, ctx) => {
      const isEmail = emailSchema.safeParse(value).success;
      const isPhone = uaPhoneSchema.safeParse(value).success;

      if (!isEmail && !isPhone) {
        ctx.addIssue({
          code: "custom",
          message: "Введено невірну адресу ел. пошти або номер телефону",
        });
      }
    }),
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
