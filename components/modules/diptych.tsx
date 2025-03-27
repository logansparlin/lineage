import { type FC } from 'react'
import { Image } from '@/components/global/image'
import { cva } from 'class-variance-authority'
import { Video } from '../global/video/video'

interface MediaItem {
  mediaType: 'image' | 'video'
  image?: any
  video?: {
    playbackId: string
    duration?: number
    aspectRatio?: string
  }
  videoThumbnail?: any
  caption?: string
}

interface DiptychProps {
  reversed?: boolean
  firstMedia: MediaItem
  secondMedia: MediaItem
}

const containerOneStyles = cva('w-full h-auto relative flex flex-col gap-y-10 md:gap-y-28', {
  variants: {
    reversed: {
      false: 'md:h-full md:w-auto',
      true: 'md:h-[80%] md:w-auto',
    }
  }
})

const mediaOneStyles = cva('overflow-hidden rounded-10 md:rounded-30 border-1 border-white/30 w-full h-auto md:h-full md:w-auto', {
  variants: {
    reversed: {
      false: 'aspect-portrait-video',
      true: 'aspect-video',
    }
  }
})

const containerTwoStyles = cva('w-full h-auto relative flex flex-col gap-y-10 md:gap-y-28', {
  variants: {
    reversed: {
      false: 'md:h-[80%] md:w-auto',
      true: 'md:h-full md:w-auto',
    }
  }
})

const mediaTwoStyles = cva('overflow-hidden rounded-10 md:rounded-30 border-1 border-white/30 w-full h-auto md:h-full md:w-auto', {
  variants: {
    reversed: {
      false: 'aspect-video',
      true: 'aspect-portrait-video',
    }
  }
})

export const Diptych: FC<DiptychProps> = ({
  reversed = false,
  firstMedia,
  secondMedia
}) => {
  const renderMedia = (media: MediaItem, containerClassName: string, mediaClassName: string) => {
    return (
      <div className={`${containerClassName} ${media.mediaType === 'video' ? 'drop-shadow-step' : ''}`}>
        <div className={mediaClassName}>
          {media.mediaType === 'image' && media.image ? (
            <Image
              image={media.image}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : null}

          {media.mediaType === 'video' && media.video ? (
            <Video {...media.video} />
          ) : null}
        </div>
        
        {media.caption ? (
          <p className="col-span-full text-18 md:text-23 text-center">{media.caption}</p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="case-module w-full md:w-fit md:h-screen md:py-100 flex flex-col md:flex-row items-center gap-y-20 md:gap-y-0 gap-x-column-1">
      {renderMedia(firstMedia, containerOneStyles({ reversed }), mediaOneStyles({ reversed }))}
      {renderMedia(secondMedia, containerTwoStyles({ reversed }), mediaTwoStyles({ reversed }))}
    </div>
  )
} 