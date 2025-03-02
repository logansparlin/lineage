import { type FC } from "react";
import { cva } from "class-variance-authority";

interface StepBadgeProps {
  step: number
}

const badgeBorderStyles = cva(['absolute z-[1] w-[calc(100%+2px)] h-[calc(100%+2px)] -top-1 -left-1 rounded-30'],
  {
    variants: {
      step: {
        1: 'bg-linear-to-b from-orange-200 to-orange-300',
        2: 'bg-linear-to-b from-green-200 to-green-300',
        3: 'bg-linear-to-b from-blue-200 to-blue-300',
        4: 'bg-linear-to-b from-pink-200 to-pink-300',
      }
    }
  }
)

export const StepBadge: FC<StepBadgeProps> = ({ step }) => {
  return (
    <div className="relative">
      <div className="text-20 px-16 py-3 bg-black rounded-30 relative z-[2]">Step {step}</div>
      <div
        inert
        aria-hidden
        className={badgeBorderStyles({ step: step as 1 | 2 | 3 | 4 })}
      />
    </div>
  )
}