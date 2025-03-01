

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
    <div className={`${className} card min-h-screen relative flex flex-col items-center justify-center gap-20 py-[20vh]`} >
      <Link
          href={`/case-study/${slug}`}
          scroll={false}
          className={`card-link z-[2] text-58 ${isMain ? 'opacity-100' : 'opacity-0'}`}
        >
          {title}
        </Link>
      <div
        className="relative z-[1] overflow-hidden w-[63%] aspect-video rounded-[20px] flex items-center justify-center"
        // style={{
        //   boxShadow: '0px 0px 150px 150px var(--color-pink-300)'
        // }}
      >
        <Image
          image={featuredImage}
          alt={title}
          sizes="50vw"
          className="w-full h-full object-cover"
        />
      </div>
      <p className={`relative z-[2] text-23 font-medium text-center max-w-750 pt-12 ${isMain ? 'opacity-100' : 'opacity-0'}`}>
        {shortDescription}
      </p>
    </div>
  )
}