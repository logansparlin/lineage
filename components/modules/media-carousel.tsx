'use client'

import { useEffect, useState, type FC } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'

import { Media } from '../global/media'
import { easings } from '@/lib/easings'
import { IconCarouselChevron } from '../icons/icon-carousel-chevron'
import { useWindowSize } from 'react-use'
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
    align: 'center',
  })

  useEffect(() => {
    if (!emblaApi) return

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
    <div className="w-full md:w-screen md:h-full">
      <div className="relative w=full md:w-[calc(100vw-160px)] h-full mx-auto py-60 md:py-100 flex flex-col justify-between items-center gap-y-40 md:gap-y-32">
        <div className="w-full relative">
          <div 
            ref={emblaRef} 
            className="
              relative w-full h-full flex items-center justify-center overflow-hidden px-35 md:px-0
              md:[--image-mask:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]
            "
            style={{
              maskImage: 'var(--image-mask)'
            }}
          >
            <div className="flex w-full">
              {items?.map((item) => {
                return (
                  <div
                    key={item._key}
                    className="grow-0 shrink-0 basis-[calc(100vw-70px)] mr-12 last-of-type:mr-0 md:basis-full h-full flex items-center justify-center"
                  >
                    <Media
                      rounded
                      className="w-full md:w-[85%] h-full flex flex-col gap-y-10 md:gap-y-20"
                      aspectRatio="16/9"
                      {...item}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="hidden md:block">
            <button
              className={`absolute top-1/2 left-0 -translate-y-1/2 transition-opacity duration-300 ease ${currentSlide === 0 ? 'opacity-40' : 'opacity-100'}`}
              onClick={handlePrevious}
            >
              <span className="sr-only">Previous</span>
              <IconCarouselChevron className="h-40 w-auto" direction="left" />
            </button>

            <button
              className={`absolute top-1/2 right-0 -translate-y-1/2 transition-opacity duration-300 ease ${currentSlide === items?.length - 1 ? 'opacity-40' : 'opacity-100'}`}
              onClick={handleNext}
            >
              <span className="sr-only">Next</span>
              <IconCarouselChevron className="h-40 w-auto" direction="right" />
            </button>
          </div>
        </div>
        <div className="case-module w-full md:w-[85%] flex-1 flex items-end">
          <div className="w-full h-4 bg-white/30 rounded-full">
            <motion.div
              className="h-full bg-step-200"
              style={{ width: `calc(100%/${items?.length})` }}
              initial={{ x: 0 }}
              animate={{ x: `calc(100%*${currentSlide})` }}
              transition={{ duration: 0.65, ease: easings.outExpo }}
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}