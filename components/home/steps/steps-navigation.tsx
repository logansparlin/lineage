'use client'

import { type FC, type ComponentProps } from 'react'
import { useHomeSteps } from './use-home-steps'
import { cva } from 'class-variance-authority'

const stepTextMap = {
  one: 'Craft Your Story',
  two: 'Find Your Fans',
  three: 'Build Your Village',
  four: 'Be Confluential',
}

interface StepsNavigationProps extends ComponentProps<'div'> {}

const stepsNavigationStyles = cva('relative whitespace-nowrap px-14 py-12 group transition-opacity duration-300 ease', {
  variants: {
    active: {
      true: 'opacity-100',
      false: 'opacity-30 all-interactions:opacity-100',
    }
  },
})

const allSteps = ['one', 'two', 'three', 'four']

export const StepsNavigation: FC<StepsNavigationProps> = ({ className, ...props }) => {
  const currentStep = useHomeSteps((state) => state.currentStep)

  return (
    <div className="w-full h-screen sticky bottom-0 z-[12] hidden md:flex items-center justify-start px-40 pointer-events-none">
      <div className="w-fit flex flex-col justify-center gap-y-0 text-18 text-center py-18 bg-[rgba(255,255,255,0.1)] border-1 border-white/20 rounded-30 pointer-events-auto">
        {allSteps?.map((step, index) => {
          return (
            <a href={`#step-${step}`} key={step} className={stepsNavigationStyles({ active: currentStep === step })}>
              <span>{index + 1}</span>
              <div className="absolute top-1/2 left-55 -translate-y-1/2 pointer-events-none opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400 ease">
                {stepTextMap[step]}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

