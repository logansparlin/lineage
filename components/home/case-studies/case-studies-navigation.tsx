'use client'

import { type FC, type ComponentProps } from 'react'
import { useHomeStore } from '../hooks/use-home-store'
import { cva } from 'class-variance-authority'
import { useLenis } from 'lenis/react';

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
  const lenis = useLenis();

  const handleClick = (e: any, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('scrolling to')
    
    lenis?.scrollTo(`#case-study-${index}`, {
      offset: 45
    });
  }

  return (
    <div className="w-full h-full absolute top-0 left-0 z-[12] hidden md:flex items-center justify-start px-40 pointer-events-none">
      <div className="w-fit flex flex-col justify-center gap-y-0 text-18 text-center py-18 bg-[rgba(255,255,255,0.1)] border-1 border-white/20 rounded-30 pointer-events-auto">
        {items?.map((item, index) => {
          return (
            <a
              key={item._id}
              href={`#case-study-${index}`}
              onClick={(e) => handleClick(e, index)}
              className={navItemStyles({ active: currentCaseStudy === index })}
            >
              <span>{index + 1}</span>
              <div className="absolute top-1/2 left-55 -translate-y-1/2 pointer-events-none opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400 ease">
                {item.title}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

