'use client'

import { type FC, type ComponentProps, useRef } from "react";
import { useStepTwoAnimation } from "./use-step-two-animation";

import { StepDetails } from "../step-details";
import { IconStepTwo } from "@/components/icons/icon-step-two";
import { StepTwoIllo } from "./step-two-illo";

interface StepTwoProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepTwo: FC<StepTwoProps> = ({ title, description, className = '', ...rest }) => {
  const stepTwoRef = useRef<HTMLDivElement>(null);

  useStepTwoAnimation(stepTwoRef);

  return (
    <section className="flex-1 flex flex-col items-center gap-y-24" ref={stepTwoRef}>
      <StepDetails
        step={2}
        title={title}
        description={description}
        icon={(
          <div className="step-icon relative z-[10] w-80 h-80 md:h-[clamp(60px,5vw,100px)] md:w-[clamp(60px,5vw,100px)] flex items-center justify-center">
            <IconStepTwo highlight className="absolute h-50 w-auto md:w-[clamp(50px,5vw,120px)] md:h-auto" />
          </div>
        )}
      />
      <div className="relative w-full flex-1 flex">
        <StepTwoIllo />
      </div>
    </section>
  )
}