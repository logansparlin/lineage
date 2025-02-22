import { getRandomGradient } from '@/lib/gradients';
import { create } from 'zustand';

interface HomeStore {
  planeRefs: {
    [key: string]: any;
  };
  addPlaneRef: (el: any, index: number) => void;
  bottomPlaneRefs: {
    [key: string]: any;
  };
  addBottomPlaneRef: (el: any, index: number) => void;
  gradient: string;
  setGradient: (gradient: string) => void;
  nextGradient: string | null;
  setNextGradient: (gradient: string | null) => void;
  isColorChanging: boolean;
  setIsColorChanging: (isColorChanging: boolean) => void;
}

export const useHomeStore = create<HomeStore>((set) => ({
  planeRefs: {},
  addPlaneRef: (el: any, index: number) => set((state) => {
    if (!el) return state;

    return { planeRefs: {
      ...state.planeRefs,
      [index]: el
    } };
  }),
  bottomPlaneRefs: {},
  addBottomPlaneRef: (el: any, index: number) => set((state) => {
    if (!el) return state;

    return { bottomPlaneRefs: {
      ...state.bottomPlaneRefs,
      [index]: el
    } };
  }),
  gradient: getRandomGradient().label,
  setGradient: (gradient: string) => set({ gradient }),
  nextGradient: null,
  setNextGradient: (gradient: string | null) => set({ nextGradient: gradient }),
  isColorChanging: false,
  setIsColorChanging: (isColorChanging: boolean) => set({ isColorChanging })
}));
