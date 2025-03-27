import { useMemo, type FC } from 'react'
import { cva } from 'class-variance-authority'
import { Image } from '@/components/global/image'
import { Video } from '../global/video/video'

const mediaBlockStyles = cva(['relative w-full h-full aspect-[var(--aspect-ratio)] overflow-hidden transform-gpu'], {
  variants: {
    size: {
      full: ' md:w-fit md:h-screen',
      large: 'rounded-10 lg:rounded-30 border-1 border-white/30 w-full h-auto md:h-[75%] md:w-fit',
      medium: 'rounded-10 lg:rounded-20 border-1 border-white/30 w-full h-auto md:h-[68%] md:w-fit',
      small: 'rounded-10 lg:rounded-20 border-1 border-white/30 w-full h-auto md:h-[55%] md:w-fit',
    },
    type: {
      image: '',
      video: 'drop-shadow-step',
    }
  }
})

const mediaBlockContainerStyles = cva(['relative w-full h-auto md:h-screen md:w-fit'], {
  variants: {
    size: {
      full: 'md:w-fit',
      large: 'gap-y-12 md:gap-y-20 flex flex-col items-center justify-center px-20 md:px-0 lg:py-80 md:w-fit',
      medium: 'gap-y-12 md:gap-y-20 flex flex-col items-center justify-center px-40 md:px-0 lg:py-80 md:w-fit',
      small: 'gap-y-12 md:gap-y-20 flex flex-col items-center justify-center px-70 md:px-0 lg:py-80 md:w-fit',
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
  controls,
  size = 'full',
  caption,
}) => {
  const aspectRatio = useMemo(() => {
    const aspect = image?.aspectRatio ?? video?.aspectRatio?.replaceAll(':', '/')

    if (!aspect) return '16/9'

    return `${aspect}`
  }, [image, video])

  return (
    <div
      className={mediaBlockContainerStyles({ size })}
      style={{
        '--aspect-ratio': aspectRatio
      } as React.CSSProperties}
    >
      <div className={mediaBlockStyles({ size, type: mediaType })}>
        {mediaType === 'image' && image ? (
          <div className="relative z-[2] w-full h-full md:h-full md:w-auto">
            <Image
              image={image}
              alt=""
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {mediaType === 'video' && video ? (
          <div className="relative z-[2] w-full h-full md:h-full md:w-auto">
            <Video {...video} className="absolute inset-0 w-full h-full" controls={controls} />
          </div>
        ) : null}
      </div>
      {caption ? (
        <p className="col-span-full text-18 md:text-20 text-center relative z-[2]">{caption}</p>
      ) : null}
    </div>
  )
} 