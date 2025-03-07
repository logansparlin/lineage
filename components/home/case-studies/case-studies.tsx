'use client';

import { type FC, useMemo, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { useMeasure } from 'react-use';
import { getStepColors } from '@/lib/get-step-colors';
import { CaseStudiesContent } from './case-studies-content';
import { clamp } from '../../../lib/clamp';
import { BlurredBackground } from './blurred-background';

interface CaseStudiesProps {
  items: {
    _id: string
    title: string
    slug: string
    step: string
    featuredImage: any
    shortDescription: string
    isMain?: boolean
  }[]
}

export const CaseStudies: FC<CaseStudiesProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<string>(items?.[0]?.step ?? 'one')

  const [contentRef, { height }] = useMeasure();

  useLenis(() => {
    if (typeof window === 'undefined' || !containerRef.current || !bottomRef.current || !topRef.current) return;

    containerRef.current.style.height = `${mainRef.current.scrollHeight}px`
    const containerRect = containerRef.current?.getBoundingClientRect();
    const offset = clamp((-1 * containerRect.top), 0, containerRef.current.scrollHeight);

    topRef.current.scrollTop = bottomRef.current.scrollTop = mainRef.current.scrollTop = offset;
  })

  const stepColors = useMemo(() => {
    return getStepColors(currentStep)
  }, [currentStep])

  if (!items) return null

  return (
    <section
      id="case-studies"
      ref={containerRef} className="relative z-[3] mb-[-100vh]"
      style={{ 
        height: `${height}px`, 
        '--step-color-100': stepColors[100],
        '--step-color-200': stepColors[200],
        '--step-color-300': stepColors[300],
        '--step-color-400': stepColors[400],
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 z-[4] transition-colors duration-1000 ease" />
      <div className="w-full h-screen overflow-hidden sticky z-[5] top-0 perspective-[3500px]">
        <div className="absolute w-full h-screen inset-0 z-[1] transition-colors duration-1000 ease bg-step-400 translate-z-[200vh]">
          <BlurredBackground className="text-step-300 w-full h-full transition-colors duration-1000 ease will-change-auto transform-gpu" />
        </div>
        <div className="w-full h-screen relative z-[2] transform-3d">

          {/* Top */}
          <div 
            inert
            ref={topRef}
            className="absolute will-change-auto w-full h-screen top-0 left-0 pointer-events-none translate-z-[-50vh] translate-y-[-50vh] rotate-x-[-90deg] overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 50%, black 100%)'
            }}
          >
            <CaseStudiesContent items={items} className="w-full pt-[200vh]" />
          </div>

          {/* Bottom */}
          <div
            inert
            ref={bottomRef}
            className="absolute will-change-auto w-full h-screen bottom-0 left-0 pointer-events-none translate-z-[-50vh] translate-y-[50vh] rotate-x-[90deg] overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.35) 50%, black 100%)'
            }}
          >
            <CaseStudiesContent items={items} />
          </div>

          {/* Primary */}
          <div
            ref={mainRef}
            className="will-change-auto w-full h-screen translate-z-[-100vh] overflow-hidden pt-[100vh]"
          >
            <CaseStudiesContent ref={contentRef} isMain items={items} setCurrentStep={setCurrentStep} />
          </div>
        </div>
      </div>
    </section>
  )
}