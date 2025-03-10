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

const mediaStyles = cva('relative h-full w-full flex items-center gap-x-120', {
  variants: {
    position: {
      first: 'justify-start',
      last: 'justify-end',
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
        <div className={`aspect-video relative h-full rounded-10 lg:rounded-30 overflow-hidden border-1 border-white/30`}>
          {media.mediaType === 'image' && media.image ? (
            <Image
              image={media.image}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : null}

          {media.mediaType === 'video' && media.video ? (
            <Video className="w-full h-full" playbackId={media.video.playbackId} />
          ) : null}
        </div>
        
        {media.text ? (
          <div className="mt-28 text-18 md:text-23 max-w-820">
            <SitePortableText value={media.text} />
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="min-w-1200 w-auto h-screen grid grid-cols-1 grid-rows-2 gap-y-24 lg:py-100">
      {renderMedia(firstMedia, mediaStyles({ position: 'first' }))}
      {renderMedia(secondMedia, mediaStyles({ position: 'last' }))}
    </div>
  )
} 