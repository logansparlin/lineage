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
      true: ['grid grid-cols-1 md:grid-cols-2 gap-40 md:gap-80'],
      false: ['max-w-960']
    }
  }
})

export const TextBlock: FC<TextBlockProps> = ({
  headline,
  text,
  hasSecondColumn = false,
  secondColumnText
}) => {
  return (
    <div className="case-module w-full md:w-screen md:h-screen max-w-1080 flex items-center justify-start lg:py-100">
      <div className={textBlockStyles({ hasSecondColumn })}>
        <div className="flex flex-col gap-y-10 md:gap-y-24">
          {headline ? (
            <h2 className="text-36 md:text-52">{headline}</h2>
          ) : null}
          
          <div className="text-18 md:text-23 max-w-820">
            <SitePortableText value={text} />
          </div>
        </div>

        {hasSecondColumn && secondColumnText ? (
          <div className="rich-text text-18 md:text-23">
            <SitePortableText value={secondColumnText} />
          </div>
        ) : null}
      </div>
    </div>
  )
} 