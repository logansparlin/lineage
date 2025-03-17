import { getRandomGradient } from '@/lib/gradients';
import { create } from 'zustand';

interface HomeStore {
  gradient: string;
  setGradient: (gradient: string) => void;
  nextGradient: string | null;
  setNextGradient: (gradient: string | null) => void;
  isColorChanging: boolean;
  setIsColorChanging: (isColorChanging: boolean) => void;
  currentStep: string;
  setCurrentStep: (currentStep: string) => void;
}

export const useHomeStore = create<HomeStore>((set) => ({
  gradient: getRandomGradient().label,
  setGradient: (gradient: string) => set({ gradient }),
  nextGradient: null,
  setNextGradient: (gradient: string | null) => set({ nextGradient: gradient }),
  isColorChanging: false,
  setIsColorChanging: (isColorChanging: boolean) => set({ isColorChanging }),
  currentStep: 'one',
  setCurrentStep: (currentStep: string) => set({ currentStep })
}));
