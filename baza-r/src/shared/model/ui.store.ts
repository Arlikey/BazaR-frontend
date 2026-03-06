import { create } from "zustand";

export type AuthMode = "login" | "register";

type UiState = {
  auth: { open: boolean; mode: AuthMode };
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  setAuthMode: (mode: AuthMode) => void;

  drawer: { open: boolean };
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;

  megamenu: { open: boolean };
  openMegamenu: () => void;
  closeMegamenu: () => void;
  setMegamenuOpen: (open: boolean) => void;

  cart: { open: boolean };
  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  auth: { open: false, mode: "login" },
  openAuth: (mode = "login") => set(() => ({ auth: { open: true, mode } })),
  closeAuth: () => set((s) => ({ auth: { ...s.auth, open: false } })),
  setAuthMode: (mode) => set((s) => ({ auth: { ...s.auth, mode } })),

  drawer: { open: false },
  openDrawer: () => set(() => ({ drawer: { open: true } })),
  closeDrawer: () => set(() => ({ drawer: { open: false } })),
  setDrawerOpen: (open) => set(() => ({ drawer: { open } })),

  megamenu: { open: false },
  openMegamenu: () => set(() => ({ megamenu: { open: true } })),
  closeMegamenu: () => set(() => ({ megamenu: { open: false } })),
  setMegamenuOpen: (open) => set(() => ({ megamenu: { open } })),

  cart: { open: false },
  openCart: () => set(() => ({ cart: { open: true } })),
  closeCart: () => set(() => ({ cart: { open: false } })),
  setCartOpen: (open) => set(() => ({ cart: { open } })),
}));
