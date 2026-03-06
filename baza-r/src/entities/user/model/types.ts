export type User = {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  email: string;
  phone: string;
  birthDate?: string | null;
  gender?: "male" | "female" | null;
  language: "uk" | "en";
};
