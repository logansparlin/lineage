import { type FC } from 'react'
import { Image } from '@/components/global/image'
import { cva } from 'class-variance-authority'

interface QuoteProps {
  text: string
  attribution?: string
  size: 'xs' | 's' | 'm' | 'l'
  image?: any
}

const quoteStyles = cva(['flex flex-col gap-y-80'], {
  variants: {
    size: {
      xs: ['text-41 max-w-850 text-center'],
      s: ['text-56 max-w-1080'],
      m: ['text-72 max-w-1320'],
      l: ['text-96 max-w-1560']
    }
  }
})

export const Quote: FC<QuoteProps> = ({ text, attribution, size, image }) => {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <div className={quoteStyles({ size })}>
        <blockquote>
          "{text}"
        </blockquote>

        {attribution ? (
          <p className="text-23">{attribution}</p>
        ) : null}
        
        {image ? (
          <div className="mt-24">
            <Image 
              image={image}
              alt=""
            />
          </div>
        ) : null}
      </div>
    </div>
  )
} 