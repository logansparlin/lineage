import { ComponentProps, FC, useMemo } from "react";
import { Image } from "./image";
import { Video } from "./video/video";

export interface MediaProps extends ComponentProps<'div'> {
  mediaType: 'image' | 'video'
  caption?: string
  image?: any
  video?: any
  aspectRatio?: string
  rounded?: boolean
}

export const Media: FC<MediaProps> = (props) => {
  const { mediaType, image, video, caption, aspectRatio = '16/9', rounded = true, ...rest } = props

  return (
    <div {...rest}>
      <div className={`w-full relative ${rounded ? 'rounded-10 lg:rounded-30 border-1 border-white/30 overflow-hidden' : ''}`} style={{ aspectRatio }}>
        {mediaType === 'image' && image ? (
          <div className="absolute inset-0 w-full h-full">
            <Image
              image={image}
              alt=""
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        {mediaType === 'video' && video ? (
          <div className="absolute inset-0 w-full h-full">
            <Video {...video} className="w-full h-full" />
          </div>
        ) : null}
      </div>
      {caption ? (
        <p className="col-span-full text-23 text-center">{caption}</p>
      ) : null}
    </div>
  )
}