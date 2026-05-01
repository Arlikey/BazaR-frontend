import type { AuthTokens } from "./auth.types";

const KEYS = {
  access: "access_token",
  refresh: "refresh_token",
  userId: "user_id",
} as const;

const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const decodeJwt = (token: string): Record<string, unknown> => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

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
  getRole: (): string[] => {
    const token = localStorage.getItem(KEYS.access);
    if (!token) return [];
    try {
      const payload = decodeJwt(token);
      const role = payload[ROLE_CLAIM];
      if (Array.isArray(role)) return role;
      if (typeof role === "string") return [role];
      return [];
    } catch {
      return [];
    }
  },
};
