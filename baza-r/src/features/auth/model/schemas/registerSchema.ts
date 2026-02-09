import * as z from "zod";
import {
  emailSchema,
  lastNameSchema,
  nameSchema,
  passwordSchema,
  uaPhoneSchema,
} from "../../../../shared/lib/validation/userValidation";

export const registerSchema = z
  .object({
    name: nameSchema,
    lastname: lastNameSchema,
    phone: uaPhoneSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .superRefine((data, ctx) => {
    const password = data.password.trim().toLowerCase();
    const name = data.name.trim().toLowerCase();
    const email = data.email.trim().toLowerCase();

    if (name && password === name) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Пароль не повинен збігатися з ім'ям",
      });
    }

    if (email && password === email) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Пароль не повинен збігатися з ел. поштою",
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
