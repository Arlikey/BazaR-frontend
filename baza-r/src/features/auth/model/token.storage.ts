import type { AuthTokens } from "./auth.types";

const KEYS = {
  access: "access_token",
  refresh: "refresh_token",
  userId: "user_id",
} as const;

export const tokenStorage = {
  set: (tokens: AuthTokens) => {
    localStorage.setItem(KEYS.access, tokens.accessToken);
    localStorage.setItem(KEYS.refresh, tokens.refreshToken);
    localStorage.setItem(KEYS.userId, tokens.userId);
  },
  getAccess: () => localStorage.getItem(KEYS.access),
  getRefresh: () => localStorage.getItem(KEYS.refresh),
  getUserId: () => localStorage.getItem(KEYS.userId),
  clear: () => {
    localStorage.removeItem(KEYS.access);
    localStorage.removeItem(KEYS.refresh);
    localStorage.removeItem(KEYS.userId);
  },
};
