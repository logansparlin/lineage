'use client';

import { useCallback, useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { useSiteStore } from "@/stores/use-site-store";

import { TestScene } from "./test-scene";
import { IntroSection } from "./intro-section";
import { ScrollIndicator } from "./scroll-indicator";

export const HomeIntro = ({ titles, description }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const inView = useInView(introRef, { once: true });
  const setColorButtonVisible = useSiteStore((state) => state.setColorButtonVisible);
  
  useEffect(() => {
    setColorButtonVisible(inView);

    return () => setColorButtonVisible(false);
  }, [inView]);
  
  const getFormattedVariant = useCallback((index: number) => {
    if (index === 0) return 'first';
    if (index === 1) return 'second';
    if (index === titles.length - 1) return 'last';
    return 'default';
  }, [titles]);

  return (
    <div ref={introRef} className="intro-container relative w-full h-fit z-[1]">
        <TestScene />
        <ScrollIndicator />
        {titles?.map((title, index) => {
          return (
            <IntroSection
              key={title._key}
              variant={getFormattedVariant(index)}
              description={index === titles.length - 1 ? description : undefined}
              {...title}
            />
          )
        })}
      </div>
  )
}