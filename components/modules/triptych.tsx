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

interface TriptychProps {
  reversed?: boolean
  firstMedia: MediaItem
  secondMedia: MediaItem
  thirdMedia: MediaItem
}

export const Triptych: FC<TriptychProps> = ({
  reversed = false,
  firstMedia,
  secondMedia,
  thirdMedia
}) => {
  const renderMedia = (media: MediaItem, containerClassName: string, mediaClassName: string) => {
    if (!media) return null

    return (
      <div className={`${containerClassName} w-full relative h-auto overflow-hidden`}>
        <div className={`${mediaClassName} rounded-10 md:rounded-30 border-1 border-white/30 overflow-hidden`}>
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
          <p className="w-full text-18 md:text-23 text-center">{media.caption}</p>
        ) : null}
      </div>
    )
  }

  return (
    <div className={`case-module relative w-full md:w-fit md:min-w-[70vw] md:h-screen md:py-100 flex flex-col items-center gap-y-20 md:gap-y-0 gap-x-50 ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      <div className={`w-full h-full md:w-[calc(40%-25px)] flex flex-col gap-y-20`}>
        {renderMedia(firstMedia, '',  'w-full md:w-auto md:h-[46vh] aspect-square' )}
        {renderMedia(secondMedia, 'flex-1', 'w-full h-full max-md:aspect-video' )}
      </div>
      <div className={`w-full md:h-full md:w-fit flex items-center`}>
        {renderMedia(thirdMedia, '', 'w-full md:h-[80vh] md:w-fit aspect-square' )}
      </div>
    </div>
  )
} 