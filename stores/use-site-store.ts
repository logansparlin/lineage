import { create } from "zustand";

interface SiteStore {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  colorButtonVisible: boolean;
  setColorButtonVisible: (visible: boolean) => void;
  cursorHidden: boolean;
  setCursorHidden: (hidden: boolean) => void;
}

export const useSiteStore = create<SiteStore>((set) => ({
  menuOpen: false,
  setMenuOpen: (open: boolean) => set({ menuOpen: open }),
  colorButtonVisible: false,
  setColorButtonVisible: (visible: boolean) => set({ colorButtonVisible: visible }),
  cursorHidden: false,
  setCursorHidden: (hidden: boolean) => set({ cursorHidden: hidden }),
}))