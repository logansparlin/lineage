'use client'

import { type FC, useMemo } from 'react'
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
  const lenis = useLenis(({ progress }) => {
    if (progress >= 0.98) {
      router.push(`/case-study/${slug}`)
    }
  })

  // useEvent('wheel', (e) => {
  //   if (lenis?.progress < 1) return;

  //   const { deltaX, deltaY } = e
  //   const delta = Math.max(deltaX, deltaY)

  //   console.log(delta)

  //   // if (delta > 20) {
  //   //   router.push(`/case-study/${slug}`)
  //   // }
  // })

  const stepColorsRGB = useMemo(() => {
    return getStepColorsRGB(step)
  }, [step])

  return (
    <section className="relative w-screen h-full pt-90 md:pt-0 flex flex-col md:flex-row gap-y-40 md:gap-y-0 md:gap-x-150">
      <CaseStudyIntro
        title={title}
        description={description}
        step={step}
      />

      <div className="h-full md:flex-1 bg-[blue]">
        <Image image={featuredImage} sizes="50vw" className="w-full h-full object-cover object-left" alt={title} />
      </div>

      <CurvedPlaneBackground
        inner={stepColorsRGB?.[400]}
        outer={stepColorsRGB?.[300]}
        className="absolute inset-0 w-full h-full z-[0]"
      />
    </section>   
  )
}