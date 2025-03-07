'use client'

import { ComponentProps, type FC, useEffect, useRef } from 'react';
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

  return (
    <div
      ref={containerRef}
      className={`${className} card min-h-screen relative flex flex-col items-center justify-center gap-20 py-[20vh]`}
    >
      <Link
        href={`/case-study/${slug}`}
        scroll={false}
        className={`card-link z-[2] text-58 ${isMain ? 'opacity-100' : 'opacity-0'}`}
      >
        {title}
      </Link>
      
      <div
        className="relative w-[60%] aspect-video flex items-center justify-center rounded-20 transition-[box-shadow] duration-1000 ease"
        style={{
          boxShadow: isMain ? '0 0 80px 80px var(--step-color-300)' : 'none'
        }}
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
      <p className={`relative z-[2] text-23 font-medium text-center max-w-750 pt-12 ${isMain ? 'opacity-100' : 'opacity-0'}`}>
        {shortDescription}
      </p>
    </div>
  )
}