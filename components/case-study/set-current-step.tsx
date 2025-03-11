'use client';

import { useEffect } from "react";
import { useSiteStore } from "@/stores/use-site-store";

export const SetCurrentStep = ({ step }: { step: string }) => {
  const { setCurrentStep } = useSiteStore();
  
  useEffect(() => {
    setCurrentStep(step);

    return () => {
      setCurrentStep(null);
    }
  }, [step, setCurrentStep]);

  return null;
}