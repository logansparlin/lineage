import { type ComponentProps, type FC } from 'react'

import { IconStepOne } from '../icons/icon-step-one'
import { IconStepTwo } from '../icons/icon-step-two'
import { IconStepThree } from '../icons/icon-step-three'
import { IconStepFour } from '../icons/icon-step-four'

interface StepTextProps extends ComponentProps<'div'> {
  step: 'one' | 'two' | 'three' | 'four'
}

const stepTextMap = {
  one: 'Step 1: Craft Your Story',
  two: 'Step 2: Find Your Fans',
  three: 'Step 3: Build Your Village',
  four: 'Step 4: BeConfluential',
}

const iconMap = {
  one: IconStepOne,
  two: IconStepTwo,
  three: IconStepThree,
  four: IconStepFour,
}

const stepColorMap = {
  one: 'text-orange-200',
  two: 'text-green-200',
  three: 'text-blue-200',
  four: 'text-pink-200',
}

export const StepText: FC<StepTextProps> = ({ step, className, ...props }) => {
  const Icon = iconMap[step]

  return (
    <div className={`${className} text-14 font-mono flex items-center gap-x-10`} {...props}>
      <p>{stepTextMap[step]}</p>
      <Icon className={`h-16 w-auto ${stepColorMap[step]}`} />
    </div>
  )
}