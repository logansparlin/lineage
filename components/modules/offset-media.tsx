import { type FC } from 'react'
import { cva } from 'class-variance-authority'

import { Image } from '@/components/global/image'
import { Video } from '@/components/global/video/video'
import { SitePortableText } from '@/components/global/site-portable-text'

interface MediaItem {
  mediaType: 'image' | 'video'
  image?: any
  video?: {
    playbackId: string
    duration?: number
    aspectRatio?: string
  }
  videoThumbnail?: any
  text?: any
}

interface OffsetMediaProps {
  firstMedia: MediaItem
  secondMedia: MediaItem
}

const mediaStyles = cva('relative h-full w-full flex items-center gap-x-120 flex gap-y-20', {
  variants: {
    position: {
      first: 'flex-row justify-start',
      last: 'flex-row-reverse justify-start',
    }
  }
})

export const OffsetMedia: FC<OffsetMediaProps> = ({
  firstMedia,
  secondMedia
}) => {
  const renderMedia = (media: MediaItem, className: string) => {
    return (
      <div className={className}>
        <div className={`aspect-video relative w-full md:w-auto md:h-full rounded-10 lg:rounded-30 overflow-hidden border-1 border-white/30`}>
          {media.mediaType === 'image' && media.image ? (
            <Image
              image={media.image}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : null}

          {media.mediaType === 'video' && media.video ? (
            <Video playbackId={media.video.playbackId} />
          ) : null}
        </div>
        
        {media.text ? (
          <div className="flex-1 text-18 md:text-20 pb-40 md:pb-0 max-w-500">
            <SitePortableText value={media.text} />
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-20 w-full md:min-w-screen-70 md:w-auto md:max-w-1280 md:h-screen md:flex md:flex-col md:gap-y-24 lg:py-100">
      {renderMedia(firstMedia, mediaStyles({ position: 'first' }))}
      {renderMedia(secondMedia, mediaStyles({ position: 'last' }))}
    </div>
  )
} 