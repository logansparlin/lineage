import { type FC, useMemo } from 'react'
import { getStepColors, getStepColorsRGB } from '@/lib/get-step-colors'

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