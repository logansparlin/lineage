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

const containerOneStyles = cva('relative flex flex-col gap-y-28', {
  variants: {
    reversed: {
      false: 'h-full w-auto',
      true: 'h-[80%] w-auto',
    }
  }
})

const mediaOneStyles = cva('overflow-hidden rounded-10 lg:rounded-30 border-1 border-white/30 h-full w-auto', {
  variants: {
    reversed: {
      false: 'aspect-portrait-video',
      true: 'aspect-video',
    }
  }
})

const containerTwoStyles = cva('relative flex flex-col gap-y-28', {
  variants: {
    reversed: {
      false: 'h-[80%] w-auto',
      true: 'h-full w-auto',
    }
  }
})

const mediaTwoStyles = cva('overflow-hidden rounded-10 lg:rounded-30 border-1 border-white/30 h-full w-auto', {
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
      <div className={containerClassName}>
        <div className={mediaClassName}>
          {media.mediaType === 'image' && media.image ? (
            <Image
              image={media.image}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : null}

          {media.mediaType === 'video' && media.video ? (
            <Video className="w-full h-full" {...media.video} />
          ) : null}
        </div>
        
        {media.caption ? (
          <p className="col-span-full text-23 text-center">{media.caption}</p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="w-fit h-screen py-100 flex items-center gap-x-column-1">
      {renderMedia(firstMedia, containerOneStyles({ reversed }), mediaOneStyles({ reversed }))}
      {renderMedia(secondMedia, containerTwoStyles({ reversed }), mediaTwoStyles({ reversed }))}
    </div>
  )
} 