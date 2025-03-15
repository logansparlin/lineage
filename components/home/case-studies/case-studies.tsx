'use client';

import { type FC, useMemo, useRef, useState } from 'react';
import { getStepColors } from '@/lib/get-step-colors';
import { useWindowSize } from 'react-use';
import { useMeasure } from 'react-use';
import { useLenis } from 'lenis/react';
import { clamp } from '../../../lib/clamp';
import dynamic from 'next/dynamic';

import { TransitionScene } from '../scenes/transition';
import { CaseStudiesContent } from './case-studies-content';
import { BlurredBackground } from './blurred-background';

const CaseStudiesClone = dynamic(() => import('./case-studies-clone').then((mod) => mod.CaseStudiesClone), { ssr: false });

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
  
  const { width } = useWindowSize();

  const [contentRef, { height }] = useMeasure();

  useLenis(() => {
    if (typeof window === 'undefined' || !containerRef.current || !bottomRef.current || !topRef.current) return;

    if (window.innerWidth < 800) return;

    const mainContent: HTMLElement = mainRef.current?.querySelector('.home-case-study');
    const topContent: HTMLElement = topRef.current?.querySelector('.home-case-study');
    const bottomContent: HTMLElement = bottomRef.current?.querySelector('.home-case-study');

    containerRef.current.style.height = `${mainRef.current.scrollHeight}px`
    const containerRect = containerRef.current?.getBoundingClientRect();
    const offset = clamp((-1 * containerRect.top), 0, containerRef.current.scrollHeight);

    mainContent.style.transform = `translate3d(0, ${-1 *offset}px, 0)`;
    topContent.style.transform = `translate3d(0, ${-1 *offset}px, 0)`;
    bottomContent.style.transform = `translate3d(0, ${-1 * offset}px, 0)`;
  })

  const stepColors = useMemo(() => {
    return getStepColors(currentStep)
  }, [currentStep])

  const isMobile = useMemo(() => {
    return width < 800;
  }, [width])

  const firstItemGradient = useMemo(() => {
    return items?.[0]?.step ?? 'one';
  }, [items])

  if (!items) return null

  return (
    <>
      <TransitionScene mode="enter" gradientOverride={firstItemGradient} />
      <section
        id="case-studies"
        ref={containerRef} className="relative w-full max-md:overflow-hidden z-[3] md:-mb-screen"
        style={{ 
          height: `${height}px`, 
          '--step-color-100': stepColors[100],
          '--step-color-200': stepColors[200],
          '--step-color-300': stepColors[300],
          '--step-color-400': stepColors[400],
        } as React.CSSProperties}
      >
        <div className="w-full overflow-hidden md:h-screen md:sticky z-[5] top-0">
          <BlurredBackground className="pointer-events-none z-[1] hidden md:block text-step-300 bg-step-400 absolute inset-0 w-full h-screen transition-colors duration-1000 ease" />
          <div className="w-full md:h-screen relative z-[2] transform-3d md:perspective-[3500px]">

            {/* Top */}
            {!isMobile ? (
              <CaseStudiesClone
                items={items}
                ref={topRef}
                className="translate-z-[-50vh] translate-y-[-50vh] rotate-x-[-90deg] overflow-hidden"
                contentClassName="w-full pt-[200vh]"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 50%, black 100%)'
                }}
              />
            ) : null}

            {/* Bottom */}
            {!isMobile ? (
              <CaseStudiesClone
                items={items}
                ref={bottomRef}
                className="translate-z-[-50vh] translate-y-[50vh] rotate-x-[90deg] overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.35) 50%, black 100%)'
                }}
              />
            ) : null}

            {/* Primary */}
            <div
              ref={mainRef}
              className="w-full md:h-screen backface-hidden md:translate-z-[-100vh] overflow-hidden md:pt-[100vh]"
            >
              <CaseStudiesContent ref={contentRef} isMain items={items} setCurrentStep={setCurrentStep} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}