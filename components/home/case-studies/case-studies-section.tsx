'use client'

import { ComponentProps, type FC, useEffect, useRef, useMemo, memo } from 'react';
import { getStepColors } from '@/lib/get-step-colors';
import { useInView } from 'motion/react';


import Link from 'next/link';
import { Image } from '@/components/global/image';
import { Video } from '@/components/global/video/video';
import { useHomeStore } from '../hooks/use-home-store';

interface CaseStudiesSectionProps extends ComponentProps<'div'> {
  _id: string
  title: string
  slug: string
  step: string
  featuredMediaType: 'image' | 'video'
  featuredImage: any
  featuredVideo: any
  shortDescription: string
  index: number
  isFirst?: boolean
  isLast?: boolean
}

export const CaseStudiesSection: FC<CaseStudiesSectionProps> = memo(({ index, title, slug, step, featuredMediaType, featuredImage, featuredVideo, shortDescription, isFirst, isLast, className = '' }) => {
  const setCurrentStep = useHomeStore(state => state.setCurrentStep)
  const setCurrentCaseStudy = useHomeStore(state => state.setCurrentCaseStudy)

  const caseSectionRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(caseSectionRef, {
    margin: '0px 0px -50% 0px'
  })

  useEffect(() => {
    if (!isInView) return;

    setCurrentStep(step)
    setCurrentCaseStudy(index)
  }, [isInView])

  const stepColors = useMemo(() => {
    return getStepColors(step ?? 'one')
  }, [step])

  return (
    <div
      id={`case-study-${index}`}
      ref={caseSectionRef}
      className={`
        ${className}
        case-studies-section group card overflow-hidden px-20 md:px-0 text-center md:text-left relative py-100 md:py-[80px]
        ${isFirst || isLast ? 'md:min-h-screen' : 'md:h-fit'}
        ${isFirst ? 'md:pt-[20vh]' : ''}
      `}
      style={{
        '--local-color-100': stepColors?.[100],
        '--local-color-200': stepColors?.[200],
        '--local-color-300': stepColors?.[300],
        '--local-color-400': stepColors?.[400],
      } as React.CSSProperties}
    >
      <div className="w-full relative flex flex-col items-center justify-center gap-10 md:gap-16">
        <h3
          className={`z-[2] pb-10 text-32 lg:text-41`}
        >
          {title}
        </h3>
        
        <Link
          href={`/case-study/${slug}`}
          scroll={false}
          className={`case-image-container pointer-events-auto relative z-[1] w-full h-auto md:w-[60%] md:h-auto lg:w-auto lg:h-[50vh] aspect-video flex items-center justify-center rounded-10 md:rounded-20`}
        >
          <div
            className="case-image absolute inset-0 z-[2] overflow-hidden w-full h-full rounded-20 flex items-center justify-center"
          >
            {featuredMediaType === 'video' && featuredVideo?.playbackId ? (
              <Video
                playbackId={featuredVideo?.playbackId}
                className="case-image w-full h-full object-cover md:hidden pointer-events-none"
                controls={false}
                muted={true}
                autoPlay={true}
              />
            ) : (
              <Image
                image={featuredImage}
                alt={title}
                sizes="10vw"
                className="case-image w-full h-full object-cover md:hidden"
              />

            )}
          </div>
        </Link>

        <p className={`relative z-[3] text-18 !leading-[140%] font-medium text-center max-w-500 lg:max-w-600 pt-10`}>
          {shortDescription}
        </p>

        <Link
          href={`/case-study/${slug}`}
          scroll={false}
          className={`z-[3] text-18 font-medium py-3 px-12 rounded-full border-1 transition-colors duration-300 ease border-white active:bg-white active:text-black hover:bg-white hover:text-black pointer-events-auto`}
        >
          Read More
        </Link>
      </div>
    </div>
  )
})
