import { FC } from "react"
import { cva } from "class-variance-authority"
import { Media } from "../global/media"
import type { MediaProps } from "../global/media"

export interface MediaGridProps {
  items: MediaProps[]
}

const containerStyles = cva('px-20 md:px-0 w-full md:w-[90vw] md:min-w-1080 h-fit md:h-screen md:py-80 flex flex-col gap-y-20', {
  variants: {
    size: {
      '2': 'md:grid md:grid-cols-2 md:gap-x-60 md:place-items-center',
      'grid': 'md:grid md:grid-cols-3 md:gap-y-48 md:gap-x-60 md:place-items-center'
    }
  }
})

const itemStyles = cva('relative w-full flex', {
  variants: {
    size: {
      '2': 'w-full md:h-[70vh]',
      '3': 'w-full aspect-[9/16]',
      'grid': 'w-full h-full'
    },
    hasCaption: {
      true: '',
      false: 'pb-12',
    },
    last: {
      true: '',
      false: '',
    }
  },
  compoundVariants: [
    {
      hasCaption: true,
      last: false,
      className: 'pb-40 md:pb-0'
    }
  ]
})


export const MediaGrid: FC<MediaGridProps> = ({ items }) => {
  if (!items) return null

  return (
    <div className={containerStyles({ size: items.length <= 2 ? '2' : 'grid' })}>
      {items.map((item, index) => (
        <div
          key={item._key}
          className={itemStyles({ 
            size: items.length <= 2 ? '2' : items.length === 3 ? '3' : 'grid', hasCaption: !!item.caption,
            last: index === items.length - 1
          })}
        >
          <Media
            {...item}
            className="w-full flex flex-col gap-y-20"
            mediaClass="w-full flex-1"
            aspectRatio={undefined}
            controls={false}
            // aspectRatio={items.length === 3 ? '9/16' : '1/1'}
          />
        </div>
      ))}
    </div>
  )
}