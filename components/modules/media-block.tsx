import { type FC } from 'react'
import { cva } from 'class-variance-authority'
import { Image } from '@/components/global/image'
import { Video } from '../global/video/video'

const mediaBlockStyles = cva(['relative overflow-hidden'], {
  variants: {
    size: {
      full: 'w-full md:w-auto md:h-screen aspect-video',
      large: 'rounded-10 lg:rounded-30 border-1 border-white/30 w-full h-auto md:h-full aspect-video',
      medium: 'rounded-10 lg:rounded-20 border-1 border-white/30 w-full h-auto md:h-[80%] aspect-video',
      small: 'rounded-10 lg:rounded-20 border-1 border-white/30 w-full h-auto md:h-[70%] aspect-video',
    }
  }
})

const mediaBlockContainerStyles = cva(['relative w-full h-auto md:w-fit md:h-screen'], {
  variants: {
    size: {
      full: '',
      large: 'gap-y-12 md:gap-y-28 flex flex-col justify-center px-20 md:px-0 lg:py-100',
      medium: 'gap-y-12 md:gap-y-28 flex flex-col justify-center px-36 md:px-0 lg:py-100',
      small: 'gap-y-12 md:gap-y-28 flex flex-col justify-center px-60 md:px-0 lg:py-100',
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
          <div className="w-full h-full">
            <Image
              image={image}
              alt=""
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {mediaType === 'video' && video ? (
          <div className="relative w-full h-full">
            <Video {...video} className="absolute inset-0 w-full h-full" controls={controls} />
          </div>
        ) : null}
      </div>
      {caption ? (
        <p className="col-span-full text-18 md:text-23 text-center">{caption}</p>
      ) : null}
    </div>
  )
} 