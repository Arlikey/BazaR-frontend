import type { User } from "../../../entities/user/model/types";
import { api } from "../../../shared/api/client";

export type LoginPayload = { identifier: string; password: string };
export type RegisterPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export const authApi = {
  login: (p: LoginPayload) =>
    api<User>("/auth/login", { method: "POST", body: JSON.stringify(p) }),
  register: (p: RegisterPayload) =>
    api<User>("/auth/register", { method: "POST", body: JSON.stringify(p) }),
  logout: () => api<void>("/auth/logout", { method: "POST" }),
};
