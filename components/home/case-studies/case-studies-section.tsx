'use client'

import { ComponentProps, type FC, useEffect, useRef, useMemo, memo, Suspense } from 'react';
import { getStepColors } from '@/lib/get-step-colors';
import { useInView } from 'motion/react';
import { urlFor } from '@/sanity/lib/image';
import dynamic from 'next/dynamic';


import Link from 'next/link';
import { Image } from '@/components/global/image';
import { View } from '@react-three/drei';
import { useHomeStore } from '../hooks/use-home-store';
import { CaseStudiesBackground } from '@/components/scenes/case-studies-background';

interface CaseStudiesSectionProps extends ComponentProps<'div'> {
  _id: string
  title: string
  slug: string
  step: string
  featuredImage: any
  shortDescription: string
  isMain?: boolean
  index: number
}

export const CaseStudiesSection: FC<CaseStudiesSectionProps> = memo(({ _id, index, title, slug, step, featuredImage, shortDescription, isMain = true, className = '', ...rest }) => {
  const setCurrentStep = useHomeStore(state => state.setCurrentStep)
  const setCurrentCaseStudy = useHomeStore(state => state.setCurrentCaseStudy)

  const imageRef = useRef<any>(null);
  const caseSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(caseSectionRef, {
    margin: '0px 0px -40% 0px'
  })

  useEffect(() => {
    if (!isInView || !isMain) return;

    setCurrentStep(step)
    setCurrentCaseStudy(index)
  }, [isInView])

  const imageUrl = useMemo(() => {
    return urlFor(featuredImage).width(300).quality(75).auto('format').url()
  }, [featuredImage])

  const stepColors = useMemo(() => {
    return getStepColors(step)
  }, [step])

  return (
    <div
      id={isMain ? `case-study-${index}` : undefined}
      ref={caseSectionRef}
      className={`${className} group card overflow-hidden px-20 md:px-0 text-center md:text-left md:min-h-screen relative py-100 md:py-[20vh]`}
      style={{
        '--local-color-100': stepColors[100],
        '--local-color-200': stepColors[200],
        '--local-color-300': stepColors[300],
        '--local-color-400': stepColors[400],
      } as React.CSSProperties}
    >
      <View className="md:hidden absolute inset-0 w-screen h-full pointer-events-none">
        <CaseStudiesBackground gradientOverride={step} />
      </View>
      <div className="w-full relative flex flex-col items-center justify-center gap-10 md:gap-20">
        <h3
          className={`z-[2] pb-10 md:pb-5 text-32 md:text-52 ${isMain ? 'visible' : 'invisible'}`}
        >
          {title}
        </h3>
        
        <Link
          href={`/case-study/${slug}`}
          scroll={false}
          ref={imageRef}
          id={`case-image-${slug}`}
          className={`
            pointer-events-auto relative z-[1] w-full md:w-[60%] aspect-video flex items-center justify-center rounded-10 md:rounded-20
          `}
        >
          {isMain ? (
            <div
              className={`
                max-md:hidden absolute inset-0 w-full h-full rounded-20 scale-x-[1.125] scale-y-[1.2] bg-[var(--step-color-300)]
                transition-colors duration-500 ease blur-[40px] pointer-events-none z-[0]
              `}
            />
          ) : null}
          <div
            className="absolute inset-0 z-[2] overflow-hidden w-full h-full rounded-20 flex items-center justify-center"
          >
            {isMain ? (
              <Image
                image={featuredImage}
                alt={title}
                sizes={isMain ? '60vw' : '100px'}
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={imageUrl} alt="" className="w-full h-full object-cover" />
            )}
          </div>
        </Link>

        <p className={`relative z-[3] text-18 md:text-20 font-medium text-center max-w-750 pt-14 ${isMain ? 'visible' : 'invisible'}`}>
          {shortDescription}
        </p>

        <Link
          href={`/case-study/${slug}`}
          scroll={false}
          className={`z-[3] text-18 md:text-20 font-medium py-3 px-12 rounded-full border-1 transition-colors duration-300 ease border-white active:bg-white active:text-black hover:bg-white hover:text-black pointer-events-auto ${isMain ? 'visible' : 'invisible'}`}
        >
          Read More
        </Link>
      </div>
    </div>
  )
})