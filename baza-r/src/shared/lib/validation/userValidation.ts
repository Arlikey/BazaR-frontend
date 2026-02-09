import * as z from "zod";

const cyrillicNameRegex =
  /^[А-ЩЬЮЯҐЄІЇа-щьюяґєії]+([ -’'][А-ЩЬЮЯҐЄІЇа-щьюяґєії]+)*$/;

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Ім'я повинно містити від 2 до 40 символів")
  .max(40, "Ім'я повинно містити від 2 до 40 символів")
  .regex(cyrillicNameRegex, "Введіть своє ім'я кирилицею");

export const lastNameSchema = z
  .string()
  .trim()
  .min(2, "Прізвище повинно містити від 2 до 40 символів")
  .max(40, "Прізвище повинно містити від 2 до 40 символів")
  .regex(cyrillicNameRegex, "Введіть своє прізвище кирилицею");

export const emailSchema = z.email("Введіть свою ел. пошту");

export const uaPhoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[^\d+]/g, ""))
  .refine((v) => /^\+380\d{9}$/.test(v), "Введіть номер мобільного телефону");

export const passwordSchema = z
  .string()
  .regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})/);
