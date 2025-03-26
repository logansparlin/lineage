'use client';

import { type FC, useMemo, useEffect, useRef, startTransition } from 'react';
import { useHomeStore } from '../hooks/use-home-store';
import { useLenis } from 'lenis/react';
import { useInView } from 'motion/react';
import { clamp } from '../../../lib/clamp';

import { TransitionScene } from '../../scenes/transition';
import { CaseStudiesScene } from '@/components/scenes/case-studies';
import { CurrentColorProvider } from './current-color-provider';
import { CaseStudiesSection } from './case-studies-section';
import { CaseStudiesNavigation } from './case-studies-navigation';
import { View } from '@react-three/drei';

interface CaseStudiesProps {
  items: {
    _id: string
    title: string
    slug: string
    step: string
    featuredMediaType: 'image' | 'video'
    featuredImage: any
    featuredVideo: any
    shortDescription: string
    index: number
  }[]
}

export const CaseStudies: FC<CaseStudiesProps> = ({ items }) => {
  const setCurrentStep = useHomeStore(state => state.setCurrentStep)
  const caseStudiesRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(caseStudiesRef, {
    amount: 0.01
  })

  useEffect(() => {
    if (!isInView) {
      startTransition(() => {
        setCurrentStep(items?.[0]?.step ?? 'one')
      })
    }
  }, [isInView, items])

  useLenis(({ scroll }) => {
    if (!caseStudiesRef.current || typeof window === 'undefined') return;
    if (window.innerWidth < 800) return;

    const containerTop = caseStudiesRef.current.offsetTop;
    const containerHeight = caseStudiesRef.current.offsetHeight;
    const scrollProgress = (scroll - containerTop) / containerHeight;
    const offset = clamp(scrollProgress * containerHeight, 80, containerHeight);
    caseStudiesRef.current.style.setProperty('--offset-top', `${offset}px`);
  });

  const firstItemGradient = useMemo(() => {
    return items?.[0]?.step ?? 'one';
  }, [items])

  if (!items) return null

  return (
    <>
      <TransitionScene mode="enter" gradientOverride={firstItemGradient} className="-mt-screen-50" />
      <div ref={caseStudiesRef} className="relative">
        <CurrentColorProvider container={caseStudiesRef} />
        <div id="case-studies-scroll" className="pointer-events-none w-full h-screen sticky top-0 z-[1] flex items-center justify-center">
          <CaseStudiesNavigation items={items} />
          <View className="absolute inset-0 w-full h-full z-[1] pointer-events-none">
            <CaseStudiesScene items={items} />
          </View>
        </div>
        <section
          id="case-studies"
          className="w-full relative h-auto mt-[-95svh] mb-[-25svh] md:-mb-screen-50"
          style={{
            contentVisibility: 'auto',
            containIntrinsicSize: '5000px',
          }}
        >
          <div
            className="relative w-full z-[2] pointer-events-none [--mask-image:black] md:[--mask-image:linear-gradient(to_bottom,transparent_0%,transparent_5%,black_6%,black_85%,transparent_86%,transparent_100%)]"
            style={{
              maskImage: 'var(--mask-image)',
              maskSize: '100vw 100vh',
              maskPosition: '0 var(--offset-top)',
            }}
          >
            {items?.map((item, index) => {
              return (
                <CaseStudiesSection
                  key={item._id}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === items.length - 1}
                  {...item}
                />
              )
            })}
          </div>
        </section>
        <div className="h-screen-50"></div>
      </div>
    </>
  )
}
