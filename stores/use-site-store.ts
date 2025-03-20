import { create } from "zustand";

interface SiteStore {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  colorButtonVisible: boolean;
  setColorButtonVisible: (visible: boolean) => void;
  cursorHidden: boolean;
  setCursorHidden: (hidden: boolean) => void;
  currentStep: string | null;
  setCurrentStep: (step: string | null) => void;
  isAnimatingGradient: boolean;
  setIsAnimatingGradient: (animating: boolean) => void;
  hasMounted: boolean;
  setHasMounted: (mounted: boolean) => void;
  caseSlugs: {
    next: string | null;
    previous: string | null;
  }
  setCaseSlugs: (slugs: { next: string | null; previous: string | null }) => void;
  resetCaseSlugs: () => void;
}

export const useSiteStore = create<SiteStore>((set) => ({
  menuOpen: false,
  setMenuOpen: (open: boolean) => set({ menuOpen: open }),
  colorButtonVisible: false,
  setColorButtonVisible: (visible: boolean) => set({ colorButtonVisible: visible }),
  cursorHidden: false,
  setCursorHidden: (hidden: boolean) => set({ cursorHidden: hidden }),
  currentStep: null,
  setCurrentStep: (step: string | null) => set({ currentStep: step }),
  isAnimatingGradient: false,
  setIsAnimatingGradient: (animating: boolean) => set({ isAnimatingGradient: animating }),
  hasMounted: false,
  setHasMounted: (mounted: boolean) => set({ hasMounted: mounted }),
  caseSlugs: {
    next: null,
    previous: null,
  },
  setCaseSlugs: (slugs: { next: string | null; previous: string | null }) => set({ caseSlugs: slugs }),
  resetCaseSlugs: () => set({ caseSlugs: { next: null, previous: null } }),
}))