import { ComponentProps, type FC } from 'react';
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
}

export const CaseStudiesContent: FC<CaseStudiesContentProps> = ({ items, ref, className = '', isMain = false, ...rest }) => {
  if (!items) return null

  return (
    <div 
      className={`${className} home-case-study w-full md:pb-[100vh]`} 
      ref={ref}
      {...rest}
    >
      {items?.map((caseStudy, index) => {
        return (
          <CaseStudiesSection
            key={caseStudy._id}
            isMain={isMain}
            index={index}
            {...caseStudy}
          />
        )
      })}
    </div>
  )
}