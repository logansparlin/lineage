import { type FC } from 'react'
import { cva } from 'class-variance-authority'

import { SitePortableText } from '@/components/global/site-portable-text'

interface TextBlockProps {
  headline?: string
  text: any
  hasSecondColumn?: boolean
  secondColumnText?: any
}

const textBlockStyles = cva(['md:py-120'], {
  variants: {
    hasSecondColumn: {
      true: 'grid grid-cols-1 md:grid-cols-2 gap-40 md:gap-80 text-18 md:text-23 max-w-1280',
      false: 'max-w-850'
    },
    hasHeadline: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      hasSecondColumn: false,
      hasHeadline: true,
      className: 'text-18 md:text-23'
    },
    {
      hasSecondColumn: false,
      hasHeadline: false,
      className: 'text-20 md:text-29'
    }
  ]
})

export const TextBlock: FC<TextBlockProps> = ({
  headline,
  text,
  hasSecondColumn = false,
  secondColumnText
}) => {
  return (
    <div className={`case-module w-full md:h-screen flex items-center justify-start lg:py-100 ${hasSecondColumn ? 'md:w-screen md:max-w-1280' : 'md:w-screen md:max-w-1080'}`}>
      <div className={textBlockStyles({ hasSecondColumn, hasHeadline: !!headline })}>
        <div className="flex flex-col gap-y-10 md:gap-y-24">
          {headline ? (
            <h2 className="text-36 md:text-52">{headline}</h2>
          ) : null}
          
          <div>
            <SitePortableText value={text} />
          </div>
        </div>

        {hasSecondColumn && secondColumnText ? (
          <div className="rich-text">
            <SitePortableText value={secondColumnText} />
          </div>
        ) : null}
      </div>
    </div>
  )
} 