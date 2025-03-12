'use client'

import { ComponentProps, type FC, useEffect, useRef, useMemo } from 'react';
import { getStepColors } from '@/lib/get-step-colors';

import { BlurredBackground } from './blurred-background';
import { Image } from '@/components/global/image';
import Link from 'next/link';

interface CaseStudiesSectionProps extends ComponentProps<'div'> {
  _id: string
  title: string
  slug: string
  step: string
  featuredImage: any
  shortDescription: string
  isMain?: boolean
  setCurrentStep?: (step: string) => void
}

export const CaseStudiesSection: FC<CaseStudiesSectionProps> = ({ _id, title, slug, step, featuredImage, shortDescription, isMain = false, className = '', setCurrentStep, ...rest }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!setCurrentStep) return;

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentStep(step);
        }
      })
    }, {
      rootMargin: '0px',
      threshold: 0,
    });

    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        intersectionObserver.disconnect();
      }
    }
  }, [])

  const stepColors = useMemo(() => {
    return getStepColors(step)
  }, [step])

  return (
    <div
      ref={containerRef}
      className={`${className} group will-change-auto card overflow-hidden px-20 md:px-0 bg-[var(--local-color-400)] md:bg-transparent text-center md:text-left md:min-h-screen relative flex flex-col items-center justify-center gap-10 md:gap-15 py-100 md:py-[20vh]`}
      style={{
        '--local-color-100': stepColors[100],
        '--local-color-200': stepColors[200],
        '--local-color-300': stepColors[300],
        '--local-color-400': stepColors[400],
      } as React.CSSProperties}
    >
      <div className="md:hidden absolute w-full h-full blur-[50px] inset-0 z-[1] translate-z-[200vh] pointer-events-none">
        <BlurredBackground className="text-[var(--local-color-300)] w-full h-full will-change-auto transform-gpu" />
      </div>
      
      <h3
        className={`z-[2] pb-10 md:pb-5 text-32 md:text-58 ${isMain ? 'opacity-100' : 'opacity-0'}`}
      >
        {title}
      </h3>
      
      <div
        className="
          relative w-full md:w-[60%] aspect-video flex items-center justify-center rounded-10 md:rounded-20 transition-[box-shadow] duration-1000 ease will-change-auto
          md:shadow-[0_0_80px_80px_var(--step-color-300)]
        "
      >
        <div className="absolute inset-0 z-[1] overflow-hidden w-full h-full rounded-20 flex items-center justify-center">
          <Image
            image={featuredImage}
            alt={title}
            sizes="50vw"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <p className={`relative z-[2] text-18 md:text-23 font-medium text-center max-w-750 pt-12 ${isMain ? 'opacity-100' : 'opacity-0'}`}>
        {shortDescription}
      </p>

      <Link
        href={`/case-study/${slug}`}
        scroll={false}
        className={`card-link z-[2] text-20 font-medium py-2 px-12 rounded-full border-1 transition-colors duration-300 ease border-white group-hover:bg-white group-hover:text-black ${isMain ? 'opacity-100' : 'opacity-0'}`}
      >
        Read More
      </Link>
    </div>
  )
}