import { type FC } from 'react'
import { Image } from '@/components/global/image'
import { cva } from 'class-variance-authority'

interface QuoteProps {
  text: string
  attribution?: string
  size: 'xs' | 's' | 'm' | 'l'
  image?: any
}

const quoteStyles = cva(['relative flex flex-col gap-y-80 text-center'], {
  variants: {
    size: {
      xs: ['text-26/110 md:text-41/110 w-full md:w-[90%]'],
      s: ['text-36/110 md:text-52/110 w-full md:w-[90%]'],
      m: ['text-41/110 md:text-66/110 w-full md:w-[90%]'],
      l: '',
    },
    hasImage: {
      true: '',
      false: '',
    }
  },
  compoundVariants: [
    {
      size: 'l',
      hasImage: false,
      className: 'text-41/110 md:text-83/110 w-full md:w-[85%]'
    },
    {
      size: 'l',
      hasImage: true,
      className: 'h-full items-center justify-center text-18/110 md:text-83/110 w-full md:w-[95%] px-20 md:px-60'
    }
  ]
})

export const Quote: FC<QuoteProps> = ({ text, attribution, size, image }) => {
  return (
    <div className="relative w-full md:w-[92vw] h-screen flex items-center justify-center md:py-80">
      <div className={quoteStyles({ size, hasImage: !!image })}>
        <blockquote className="relative z-[1]">
          {text}
        </blockquote>

        {attribution ? (
          <p className="text-23 relative z-[1]">{attribution}</p>
        ) : null}
        
        {image ? (
          <div className="absolute inset-0 w-full h-full rounded-10 md:rounded-30 overflow-hidden z-[0]">
            <Image 
              image={image}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        ) : null}
      </div>
    </div>
  )
} 