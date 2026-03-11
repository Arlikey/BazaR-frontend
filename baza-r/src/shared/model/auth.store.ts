import { tokenStorage } from "../../features/auth/model/token.storage";
import { authApi } from "../../features/auth/api/authApi";
import { create } from "zustand";

export const useAuthStore = create<{
  isAuthenticated: boolean;
  isInitializing: boolean;
  setAuthenticated: (v: boolean) => void;
  initialize: () => Promise<void>;
}>((set) => ({
  isAuthenticated: false,
  isInitializing: true,
  setAuthenticated: (v) => set({ isAuthenticated: v }),
  initialize: async () => {
    const accessToken = tokenStorage.getAccess();
    const refreshToken = tokenStorage.getRefresh();

    if (!refreshToken) {
      set({ isAuthenticated: false, isInitializing: false });
      return;
    }

    if (accessToken) {
      set({ isAuthenticated: true, isInitializing: false });
      return;
    }

    try {
      const tokens = await authApi.refresh(refreshToken);
      tokenStorage.set(tokens);
      set({ isAuthenticated: true, isInitializing: false });
    } catch {
      tokenStorage.clear();
      set({ isAuthenticated: false, isInitializing: false });
    }
  },
}));
