import { api } from "@/shared/api/client";
import type { AuthTokens } from "../model/auth.types";
import { tokenStorage } from "../model/token.storage";

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export const authApi = {
  login: (p: LoginPayload) =>
    api<AuthTokens>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(p),
    }),
  register: (p: RegisterPayload) =>
    api<AuthTokens>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(p),
    }),
  logout: () =>
    api("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({
        userId: tokenStorage.getUserId(),
        refreshToken: tokenStorage.getRefresh(),
      }),
    }),
  refresh: () =>
    api<AuthTokens>("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({
        userId: tokenStorage.getUserId(),
        refreshToken: tokenStorage.getRefresh(),
      }),
    }),
};
