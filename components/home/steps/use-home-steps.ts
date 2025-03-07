import { create } from 'zustand'

interface HomeStepsStore {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export const useHomeSteps = create<HomeStepsStore>((set) => ({
  currentStep: 'one',
  setCurrentStep: (step) => set({ currentStep: step }),
}))