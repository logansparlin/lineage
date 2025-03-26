import { urlFor } from "@/sanity/lib/image";
import { ComponentProps, useMemo, type FC } from "react";

interface ImageProps extends Omit<ComponentProps<'img'>, 'src' | 'srcSet'> {
  image: any
  alt?: string
  className?: string
  quality?: number
  sizes?: string
  width?: number
  height?: number
}

export const Image: FC<ImageProps> = (props) => {
  const { image, quality = 90, alt, className, sizes = 'auto', width, height, ...rest } = props

  const deviceSizes = [320, 480, 768, 1024, 1280, 1536]

  const initialSrc = useMemo(() => {
    if (!image) return '';

    if (width) {
      return urlFor(image).width(width).format('webp').quality(quality).url()
    }

    if (height) {
      return urlFor(image).height(height).format('webp').quality(quality).url()
    }

    return image.lqip ?? urlFor(image).width(320).format('webp').quality(quality).url()
  }, [image, quality, width, height])

  const srcSet = useMemo(() => {
    if (!image || (width || height)) return '';
    return deviceSizes.map(size => `${urlFor(image).width(size).format('webp').quality(quality).url()} ${size}w`).join(', ')
  }, [image, quality, width, height])

  return (
    <img
      src={initialSrc}
      srcSet={srcSet}
      alt={alt}
      className={`${className} transform-gpu select-none pointer-events-none`}
      sizes={sizes}
      {...rest}
    />
  )
}