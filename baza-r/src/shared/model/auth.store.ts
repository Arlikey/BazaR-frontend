import { create } from "zustand";
import { tokenStorage } from "../../features/auth/model/token.storage";

export const useAuthStore = create<{
  isAuthenticated: boolean;
  setAuthenticated: (v: boolean) => void;
}>((set) => ({
  isAuthenticated: !!tokenStorage.getAccess(),
  setAuthenticated: (v) => set({ isAuthenticated: v }),
}));
