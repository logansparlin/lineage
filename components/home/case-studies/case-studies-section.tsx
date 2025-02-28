

import { ComponentProps, type FC } from 'react';
import { Image } from '@/components/global/image';
import Link from 'next/link';

interface CaseStudiesSectionProps extends ComponentProps<'div'> {
  _id: string
  title: string
  slug: string
  palette: string
  featuredImage: any
  shortDescription: string
  isMain?: boolean
}

export const CaseStudiesSection: FC<CaseStudiesSectionProps> = ({ _id, title, slug, palette, featuredImage, shortDescription, isMain = false, className = '', ...rest }) => {
  return (
    <div
      className={`${className} card min-h-screen relative flex flex-col items-center justify-center gap-20 py-[20vh]`}
    >
      <Link
          href={`/case-study/${slug}`}
          scroll={false}
          className={`card-link text-58 ${isMain ? 'opacity-100' : 'opacity-0'}`}
        >
          {title}
        </Link>
      <div className="relative overflow-hidden w-[66%] aspect-video rounded-[20px] flex items-center justify-center">
        <Image
          image={featuredImage}
          alt={title}
          sizes="50vw"
          className="w-full h-full object-cover"
        />
      </div>
      <p className={`text-20 text-center max-w-650 pt-12 ${isMain ? 'opacity-100' : 'opacity-0'}`}>
        {shortDescription}
      </p>
    </div>
  )
}