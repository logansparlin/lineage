'use client'

import { type FC, type ComponentProps } from 'react'
import { useHomeStore } from '../hooks/use-home-store'
import { cva } from 'class-variance-authority'

interface CaseStudiesNavigationProps extends ComponentProps<'div'> {
  items?: any[];
}

const navItemStyles = cva('relative whitespace-nowrap px-14 py-8 group transition-opacity duration-300 ease', {
  variants: {
    active: {
      true: 'opacity-100',
      false: 'opacity-30 all-interactions:opacity-100',
    }
  },
})

export const CaseStudiesNavigation: FC<CaseStudiesNavigationProps> = ({ items, className, ...props }) => {
  const currentCaseStudy = useHomeStore((state) => state.currentCaseStudy)

  return (
    <div className="w-full h-full absolute top-0 left-0 z-[12] hidden md:flex items-center justify-start px-40 pointer-events-none">
      <div className="w-fit flex flex-col justify-center gap-y-0 text-18 text-center py-18 bg-[rgba(255,255,255,0.1)] border-1 border-white/20 rounded-30 pointer-events-auto">
        {items?.map((item, index) => {
          return (
            <a href={`#case-study-${index}`} key={item._id} className={navItemStyles({ active: currentCaseStudy === index })}>
              <span>{index + 1}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

