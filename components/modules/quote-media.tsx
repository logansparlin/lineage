import { type FC } from 'react'
import { Media, MediaProps } from '../global/media'

interface QuoteMediaProps extends MediaProps {
  text: string
  attribution?: string
  size: 'xs' | 's' | 'm' | 'l'
  mediaPosition: 'left' | 'right'
}

export const QuoteMedia: FC<QuoteMediaProps> = ({ text, attribution, image, video, mediaType, mediaPosition }) => {
  return (
    <div className="relative w-full md:w-[85vw] md:min-w-1080 md:h-screen flex flex-col-reverse gap-y-30 md:gap-y-0 md:grid md:grid-cols-2 md:place-items-center md:gap-x-24 px-20 md:px-0 md:py-80">
      <div className={`w-full flex flex-col gap-y-20 md:gap-y-80 row-start-1 ${mediaPosition === 'left' ? 'md:col-start-2 text-left items-end' : 'md:col-start-1 text-left items-start'}`}>
        <blockquote className="relative text-18 md:text-23 w-full md:w-[75%]">
          {text}
        </blockquote>

        {attribution ? (
          <p className="text-14 font-mono w-full md:w-[75%]">{attribution}</p>
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