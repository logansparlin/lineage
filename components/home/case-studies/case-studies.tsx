'use client';

import { type FC, Suspense, useEffect, useMemo, useRef } from 'react';
import { useHomeStore } from '../hooks/use-home-store';
import { useWindowSize, useRafLoop } from 'react-use';
import { useInView } from 'motion/react';
import { clamp } from '../../../lib/clamp';

import dynamic from 'next/dynamic';

import { TransitionScene } from '../../scenes/transition';
import { CaseStudiesContent } from './case-studies-content';
import { CaseStudiesBackground } from '@/components/scenes/case-studies-background';
import { CurrentColorProvider } from './current-color-provider';
import { CaseStudiesNavigation } from './case-studies-navigation';
import { View } from '@react-three/drei';

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
  const setCurrentStep = useHomeStore(state => state.setCurrentStep)
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(caseStudiesRef, {
    amount: 0.01
  })

  useEffect(() => {
    if (!isInView) {
      setCurrentStep(items?.[0]?.step ?? 'one')
    }
  }, [isInView, items])

  const { width } = useWindowSize();

  useRafLoop(() => {
    if (typeof window === 'undefined' || !caseStudiesRef.current || !bottomRef.current || !topRef.current) return;

    if (window.innerWidth < 800) return;

    const firstSectionHeight = (caseStudiesRef.current.querySelector('.case-studies-section')?.clientHeight ?? 0) / 2;
    caseStudiesRef.current.style.height = `${mainRef.current.scrollHeight}px`
    
    const containerRect = caseStudiesRef.current?.getBoundingClientRect();
    const offset = clamp((-1 * (containerRect.top - window.innerHeight)), window.innerHeight, (caseStudiesRef.current.scrollHeight));

    console.log(offset)

    mainRef.current.scrollTop = offset;
    topRef.current.scrollTop = offset;
    bottomRef.current.scrollTop = offset;
  })

  const isMobile = useMemo(() => {
    return width < 800;
  }, [width])

  const firstItemGradient = useMemo(() => {
    return items?.[0]?.step ?? 'one';
  }, [items])

  if (!items) return null

  return (
    <>
      <TransitionScene mode="enter" gradientOverride={firstItemGradient} className="-mt-screen-50" />
      <section
        id="case-studies"
        ref={caseStudiesRef}
        className="relative w-full max-md:overflow-hidden z-[3] md:-mb-screen"
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: '5000px',
        }}
      >
        <CurrentColorProvider container={caseStudiesRef} />
        <div className="w-full overflow-hidden md:h-screen md:sticky z-[1] top-0 pointer-events-none">
          <CaseStudiesNavigation items={items} />
          {!isMobile ? (
            <View className="absolute inset-0 w-screen h-screen pointer-events-none">
              <CaseStudiesBackground />
            </View>
          ) : null}
          <div className="w-full md:h-screen relative z-[2] transform-3d md:perspective-[3500px]">
              {/* Top */}
              <Suspense fallback={null}>
                  <CaseStudiesClone
                    items={items}
                    ref={topRef}
                    className="max-md:hidden translate-z-[-50vh] translate-y-[-50vh] rotate-x-[-90deg] overflow-hidden pointer-events-none"
                    contentClassName="w-full pt-[200vh]"
                    style={{
                      maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 20%, black 98%)'
                    }}
                  />
              </Suspense>

              {/* Bottom */}
              <Suspense fallback={null}>
                  <CaseStudiesClone
                    items={items}
                    ref={bottomRef}
                    className="max-md:hidden translate-z-[-50vh] translate-y-[50vh] rotate-x-[90deg] overflow-hidden pointer-events-none"
                    style={{
                      maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.1) 20%, black 98%)'
                    }}
                  />
              </Suspense>

              {/* Primary */}
              <div
                ref={mainRef}
                className="w-full md:h-screen backface-hidden md:translate-z-[-100vh] overflow-hidden md:pt-[100vh]"
              >
                <CaseStudiesContent isMain items={items} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}