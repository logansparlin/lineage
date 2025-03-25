import { type FC } from 'react'
import { cva } from 'class-variance-authority'
import { Image } from '@/components/global/image'
import { Video } from '../global/video/video'

const mediaBlockStyles = cva(['relative overflow-hidden'], {
  variants: {
    size: {
      full: 'w-full md:w-fit md:h-screen aspect-video',
      large: 'rounded-10 lg:rounded-30 border-1 border-white/30 w-full h-auto md:h-full md:w-fit aspect-video',
      medium: 'rounded-10 lg:rounded-20 border-1 border-white/30 w-full h-auto md:h-[75%] md:w-fit aspect-video',
      small: 'rounded-10 lg:rounded-20 border-1 border-white/30 w-full h-auto md:h-[55%] md:w-fit aspect-video',
    }
  }
})

const mediaBlockContainerStyles = cva(['relative w-full h-auto md:h-screen'], {
  variants: {
    size: {
      full: 'md:w-screen',
      large: 'gap-y-12 md:gap-y-20 flex flex-col items-center justify-center px-20 md:px-0 lg:py-80 md:w-fit',
      medium: 'gap-y-12 md:gap-y-20 flex flex-col items-center justify-center px-36 md:px-0 lg:py-80 md:w-fit',
      small: 'gap-y-12 md:gap-y-20 flex flex-col items-center justify-center px-60 md:px-0 lg:py-80 md:w-fit',
    }
  }
})

interface FullBleedMediaProps {
  mediaType: 'image' | 'video'
  image?: any
  video?: {
    playbackId: string
    duration: number
    aspectRatio: string
  }
  videoThumbnail?: any
  controls?: boolean
  size: 'full' | 'large' | 'medium' | 'small'
  caption?: string
}

export const MediaBlock: FC<FullBleedMediaProps> = ({
  mediaType,
  image,
  video,
  videoThumbnail,
  controls,
  size = 'full',
  caption,
}) => {
  return (
    <div className={mediaBlockContainerStyles({ size })}>
      <div className={mediaBlockStyles({ size })}>
        {mediaType === 'image' && image ? (
          <div className="w-full h-auto md:h-full md:w-auto">
            <Image
              image={image}
              alt=""
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {mediaType === 'video' && video ? (
          <div className="relative w-full h-auto md:h-full md:w-auto">
            <Video {...video} className="absolute inset-0 w-full h-full" controls={controls} />
          </div>
        ) : null}
      </div>
      {caption ? (
        <p className="col-span-full text-18 md:text-20 text-center">{caption}</p>
      ) : null}
    </div>
  )
} 