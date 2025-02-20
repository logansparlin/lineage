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
  })
}));
