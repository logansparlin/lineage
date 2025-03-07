import { type FC } from 'react'
import { cva } from 'class-variance-authority'
import { Image } from '@/components/global/image'
import { Video } from '../global/video/video'

const mediaBlockStyles = cva(['relative overflow-hidden'], {
  variants: {
    size: {
      full: 'h-screen aspect-video',
      large: 'rounded-10 lg:rounded-30 border-1 border-white/30 h-full aspect-video',
      medium: 'rounded-10 lg:rounded-20 border-1 border-white/30 h-[80%] aspect-video',
      small: 'rounded-10 lg:rounded-20 border-1 border-white/30 h-[70%] aspect-video',
    }
  }
})

const mediaBlockContainerStyles = cva(['relative w-fit h-screen'], {
  variants: {
    size: {
      full: '',
      large: 'gap-y-28 flex flex-col justify-center lg:py-100',
      medium: 'gap-y-28 flex flex-col justify-center lg:py-100',
      small: 'gap-y-28 flex flex-col justify-center lg:py-100',
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
  size: 'full' | 'large' | 'medium' | 'small'
  caption?: string
}

export const MediaBlock: FC<FullBleedMediaProps> = ({
  mediaType,
  image,
  video,
  videoThumbnail,
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
            <Video {...video} className="absolute inset-0 w-full h-full" />
          </div>
        ) : null}
      </div>
      {caption ? (
        <p className="col-span-full text-23 text-center">{caption}</p>
      ) : null}
    </div>
  )
} 