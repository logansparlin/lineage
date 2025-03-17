'use client';

import { type FC, useMemo, useRef } from 'react';
import { urlFor } from '@/sanity/lib/image';
import { useWindowSize, useRafLoop } from 'react-use';
import { useLenis } from 'lenis/react';
import { clamp } from '../../../lib/clamp';
import dynamic from 'next/dynamic';

import { TransitionScene } from '../../scenes/transition';
import { CaseStudiesContent } from './case-studies-content';
import { CaseStudiesBackground } from '@/components/scenes/case-studies-background';
import { View } from '@react-three/drei';
import { CurrentColorProvider } from './current-color-provider';

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
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { width } = useWindowSize();

  useRafLoop(() => {
    if (typeof window === 'undefined' || !caseStudiesRef.current || !bottomRef.current || !topRef.current) return;

    if (window.innerWidth < 800) return;

    const mainContent: HTMLElement = mainRef.current?.querySelector('.home-case-study');
    const topContent: HTMLElement = topRef.current?.querySelector('.home-case-study');
    const bottomContent: HTMLElement = bottomRef.current?.querySelector('.home-case-study');

    caseStudiesRef.current.style.height = `${mainRef.current.scrollHeight}px`
    const containerRect = caseStudiesRef.current?.getBoundingClientRect();
    const offset = clamp((-1 * containerRect.top), 0, caseStudiesRef.current.scrollHeight);

    mainRef.current.scrollTop = offset;
    topRef.current.scrollTop = offset;
    bottomRef.current.scrollTop = offset;

    // mainContent.style.transform = `translate3d(0, ${-1 *offset}px, 0)`;
    // topContent.style.transform = `translate3d(0, ${-1 *offset}px, 0)`;
    // bottomContent.style.transform = `translate3d(0, ${-1 * offset}px, 0)`;
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
      <TransitionScene mode="enter" gradientOverride={firstItemGradient} />
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
          <View className="absolute inset-0 w-screen h-screen pointer-events-none">
            <CaseStudiesBackground
              items={items?.map((item: any) => {
                return {
                  url: urlFor(item.featuredImage).auto('format').width(1200).url(),
                  aspectRatio: item.featuredImage?.aspectRatio,
                  title: item.title,
                  slug: item.slug
                }
              })}
            />
          </View>
          <div className="w-full md:h-screen relative z-[2] transform-3d md:perspective-[3500px]">
              {/* Top */}
              {!isMobile ? (
                <CaseStudiesClone
                  items={items}
                  ref={topRef}
                  className="translate-z-[-50vh] translate-y-[-50vh] rotate-x-[-90deg] overflow-hidden pointer-events-none"
                  contentClassName="w-full pt-[200vh]"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 20%, black 98%)'
                  }}
                />
              ) : null}

              {/* Bottom */}
              {!isMobile ? (
                <CaseStudiesClone
                  items={items}
                  ref={bottomRef}
                  className="translate-z-[-50vh] translate-y-[50vh] rotate-x-[90deg] overflow-hidden pointer-events-none"
                  style={{
                    maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.1) 20%, black 98%)'
                  }}
                />
              ) : null}

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