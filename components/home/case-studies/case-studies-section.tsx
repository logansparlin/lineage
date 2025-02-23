

import { ComponentProps, type FC } from 'react';
import Link from 'next/link';

interface CaseStudiesSectionProps extends ComponentProps<'div'> {
  ref?: any;
  isMain?: boolean;
  items: {
    _id: string
    title: string
    slug: string
    palette: string
  }[]
}

export const CaseStudiesSection: FC<CaseStudiesSectionProps> = ({ items, ref = () => {}, isMain = false, className = '', ...rest }) => {
  if (!items) return null

  return (
    <div ref={ref} className={`${className} home-case-study w-full pb-[200vh] bg-black`} {...rest}>
      {items?.map(caseStudy => {
        return (
          <div
            key={caseStudy._id}
            className={`h-screen relative flex flex-col items-center justify-center gap-32`}
          >
            <Link
                href={`/case-study/${caseStudy.slug}`}
                className={`text-58 ${isMain ? 'opacity-100' : 'opacity-0'}`}
              >
                {caseStudy.title}
              </Link>
            <div className="w-[50%] aspect-[16/10] rounded-[20px] flex items-center justify-center bg-[pink]">
            </div>
          </div>
        )
      })}
    </div>
  )
}