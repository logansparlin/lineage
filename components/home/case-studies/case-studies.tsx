'use client';

import { type FC, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { useMeasure } from 'react-use';

import { CaseStudiesSection } from './case-studies-section';
import { clamp } from '../../../lib/clamp';

interface CaseStudiesProps {
  items: {
    _id: string
    title: string
    slug: string
    palette: string
  }[]
}

const colorMap = {
  orange: 'bg-orange-400',
  green: 'bg-green-400',
  blue: 'bg-blue-400',
  pink: 'bg-pink-400',
}

export const CaseStudies: FC<CaseStudiesProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [contentRef, { height }] = useMeasure();

  useLenis(() => {
    if (typeof window === 'undefined' || !containerRef.current || !bottomRef.current || !topRef.current) return;

    containerRef.current.style.height = `${mainRef.current.scrollHeight}px`
    const containerRect = containerRef.current?.getBoundingClientRect();
    const offset = clamp((-1 * containerRect.top), 0, containerRef.current.scrollHeight);

    topRef.current.scrollTop = bottomRef.current.scrollTop = mainRef.current.scrollTop = offset;
  })

  if (!items) return null

  return (
    <div ref={containerRef} className="relative z-[3] mb-[-100vh]" style={{ height: `${height}px` }}>
      <div className="w-full h-screen overflow-hidden sticky top-0 perspective-[5000px]">
        <div className="w-full h-screen transform-3d">

          {/* Top */}
          <div inert ref={topRef} className="absolute will-change-auto w-full h-screen top-0 left-0 pointer-events-none translate-z-[-50vh] translate-y-[-50vh] rotate-x-[-90deg] overflow-hidden">
            <CaseStudiesSection items={items} className="w-full pt-[200vh]" />
          </div>

          {/* Bottom */}
          <div inert ref={bottomRef} className="absolute will-change-auto w-full h-screen bottom-0 left-0 pointer-events-none translate-z-[-50vh] translate-y-[50vh] rotate-x-[90deg] overflow-hidden">
            <CaseStudiesSection items={items} />
          </div>

          {/* Primary */}
          <div
            ref={mainRef}
            className="will-change-auto w-full h-screen translate-z-[calc(-1*100vh)] overflow-hidden pt-[100vh]"
          >
            <CaseStudiesSection ref={contentRef} isMain items={items} />
          </div>
        </div>
      </div>
    </div>
  )
}