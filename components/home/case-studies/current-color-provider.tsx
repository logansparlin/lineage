'use client'

import { useMemo } from "react";
import { useHomeStore } from "../hooks/use-home-store";
import { getStepColors } from "@/lib/get-step-colors";
import { useIsomorphicLayoutEffect } from "react-use";

export const CurrentColorProvider = ({ container }: { container: any }) => {
  const { currentStep } = useHomeStore();

  const stepcolors = useMemo(() => {
    return getStepColors(currentStep);
  }, [currentStep])

  useIsomorphicLayoutEffect(() => {
    if (!container.current) return;

    container.current.style.setProperty('--step-color-100', stepcolors[100]);
    container.current.style.setProperty('--step-color-200', stepcolors[200]);
    container.current.style.setProperty('--step-color-300', stepcolors[300]);
    container.current.style.setProperty('--step-color-400', stepcolors[400]);
  }, [stepcolors])

  return null;
}