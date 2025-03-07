

import { ComponentProps, type FC } from 'react';
import Link from 'next/link';
import { CaseStudiesSection } from './case-studies-section';

interface CaseStudiesContentProps extends ComponentProps<'div'> {
  ref?: any;
  isMain?: boolean;
  items: {
    _id: string
    title: string
    slug: string
    step: string
    featuredImage: any
    shortDescription: string
  }[]
  setCurrentStep?: (step: string) => void
}

export const CaseStudiesContent: FC<CaseStudiesContentProps> = ({ items, ref = () => {}, isMain = false, className = '', setCurrentStep, ...rest }) => {
  if (!items) return null

  return (
    <div 
      ref={ref}
      className={`${className} home-case-study w-full pb-[200vh]`} 
      {...rest}
    >
      {items?.map(caseStudy => {
        return <CaseStudiesSection key={caseStudy._id} {...caseStudy} isMain={isMain} setCurrentStep={setCurrentStep} />
      })}
    </div>
  )
}