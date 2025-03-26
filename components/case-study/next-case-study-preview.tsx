'use client'

import { type FC, useCallback, useMemo, useRef } from 'react'
import { getStepColorsRGB } from '@/lib/get-step-colors'
import { useRouter } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { useEvent } from 'react-use'

import { CurvedPlaneBackground } from '@/components/global/curved-plane-background'
import { CaseStudyIntro } from './case-study-intro';
import { Image } from '../global/image';

interface NextCaseStudyPreviewProps {
  slug: string;
  title: string;
  description?: string;
  step: 'one' | 'two' | 'three' | 'four';
  featuredImage: any;
}

export const NextCaseStudyPreview: FC<NextCaseStudyPreviewProps> = (props) => {
  const { slug, title, description, step, featuredImage } = props;
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback((axis: 'x' | 'y') => {
    const rect = ref.current?.getBoundingClientRect()

    if (!rect) return;

    const { x, y } = rect

    const offset = axis === 'x' ? x : y

    if (offset <= 10) {
      router.push(`/case-study/${slug}`, { scroll: false })
    }
  }, [slug])

  useLenis((lenis) => {
    if (lenis.isSmooth) {
      handleScroll('x')
    }
  })

  useEvent('scroll', () => {
    if (typeof window === 'undefined') return;

    if (window.innerWidth < 800) {
      handleScroll('y')
    }
  })

  const stepColorsRGB = useMemo(() => {
    return getStepColorsRGB(step)
  }, [step])

  return (
    <section ref={ref} className="relative w-screen h-screen overflow-hidden md:h-full pt-90 md:pt-0 flex flex-col md:flex-row gap-y-40 md:gap-y-0 md:gap-x-150">
      <CaseStudyIntro
        title={title}
        description={description}
        step={step}
      />
      
      <div className="relative">
        <div
          className="absolute top-0 left-0 w-full md:w-auto md:h-full md:flex-1"
          style={{
            aspectRatio: featuredImage.aspectRatio
          }}
        >
          <Image image={featuredImage} sizes="50vw" className="w-full h-full object-cover object-left" alt={title} />
        </div>
      </div>

      <CurvedPlaneBackground
        inner={stepColorsRGB?.[400]}
        outer={stepColorsRGB?.[300]}
        className="absolute inset-0 w-full h-full z-[0] pointer-events-none"
      />
    </section>   
  )
}