'use client';

import { useCallback, useRef } from "react";

import { TestScene } from "./test-scene";
import { IntroSection } from "./intro-section";

export const HomeIntro = ({ titles, description }) => {
  const introRef = useRef<HTMLDivElement>(null);

  const getFormattedVariant = useCallback((index: number) => {
    if (index === 0) return 'first';
    if (index === 1) return 'second';
    if (index === titles.length - 1) return 'last';
    return 'default';
  }, [titles]);

  return (
    <div ref={introRef} className="intro-container relative w-full h-fit z-[1]">
        <TestScene />
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