import { type FC } from 'react'
import { Image } from '@/components/global/image'
import { cva } from 'class-variance-authority'
import { Media, MediaProps } from '../global/media'

interface QuoteMediaProps extends MediaProps {
  text: string
  attribution?: string
  size: 'xs' | 's' | 'm' | 'l'
  mediaPosition: 'left' | 'right'
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

export const QuoteMedia: FC<QuoteMediaProps> = ({ text, attribution, image, video, mediaType, mediaPosition }) => {
  return (
    <div className="relative w-full md:w-[80vw] h-screen grid grid-cols-1 md:grid-cols-2 md:place-items-center md:gap-x-24 md:py-80">
      <div className={`w-full flex flex-col gap-y-20 md:gap-y-80 row-start-1 ${mediaPosition === 'left' ? 'md:col-start-2 text-left items-end' : 'md:col-start-1 text-left items-start'}`}>
        <blockquote className="relative text-18 md:text-23 w-[75%]">
          {text}
        </blockquote>

        {attribution ? (
          <p className="text-14 font-mono w-[75%]">{attribution}</p>
        ) : null}
      </div>

      <div className={`relative w-full h-auto row-start-1 ${mediaPosition === 'left' ? 'md:col-start-1' : 'md:col-start-2'}`}>
        <Media
          rounded
          className="w-full h-auto"
          mediaType={mediaType}
          image={image}
          video={video}
        />
      </div>
    </div>
  )
} 