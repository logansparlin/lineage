'use client'

import { useEffect, useState, type FC } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'

import { Media } from '../global/media'
import { easings } from '@/lib/easings'
import { IconCarouselChevron } from '../icons/icon-carousel-chevron'
interface MediaCarouselProps {
  items: {
    _key: string
    mediaType: 'image' | 'video'
    image?: any
    video?: {
      playbackId: string
      duration: number
      aspectRatio: string
    }
    caption?: string
  }[]
}

export const MediaCarousel: FC<MediaCarouselProps> = ({
  items
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    align: 'center'
  })

  useEffect(() => {
    if (!emblaApi) return

    console.log('emblaApi', emblaApi)
    emblaApi.on('select', () => {
      const currentSlide = emblaApi.selectedScrollSnap()
      setCurrentSlide(currentSlide)
    })
  }, [emblaApi])

  const handleNext = () => {
    emblaApi?.scrollNext()
  }

  const handlePrevious = () => {
    emblaApi?.scrollPrev()
  }

  return (
    <div className="w-screen h-full">
      <div className="relative w-[calc(100vw-160px)] h-full mx-auto py-100 flex flex-col justify-between items-center gap-y-32">
        <div ref={emblaRef} className="flex-1 w-full h-full flex items-center justify-center overflow-hidden">
          <div className="flex w-full h-full">
            {items?.map((item) => {
              return (
                <div key={item._key} className="grow-0 shrink-0 basis-full h-full flex items-center justify-center">
                  <Media aspectRatio="16/8" className="w-[85%] h-full flex flex-col gap-y-20" rounded mediaType={item.mediaType} image={item.image} video={item.video} caption={item.caption} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-[85%] h-4 bg-white/30 rounded-full">
          <motion.div
            className="h-full bg-step-200"
            style={{ width: `calc(100%/${items?.length})` }}
            initial={{ x: 0 }}
            animate={{ x: `calc(100%*${currentSlide})` }}
            transition={{ duration: 0.65, ease: easings.outExpo }}
          ></motion.div>
        </div>

        <button className="absolute top-1/2 left-0 -translate-y-1/2" onClick={handlePrevious}>
          <span className="sr-only">Previous</span>
          <IconCarouselChevron className="h-40 w-auto" direction="left" />
        </button>

        <button className="absolute top-1/2 right-0 -translate-y-1/2" onClick={handleNext}>
          <span className="sr-only">Next</span>
          <IconCarouselChevron className="h-40 w-auto" direction="right" />
        </button>
      </div>
    </div>
  )
}