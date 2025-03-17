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
    <section className="md:flex-1 md:flex md:flex-col md:items-center gap-y-50" ref={stepTwoRef}>
      <StepDetails
        step={2}
        title={title}
        description={description}
        icon={(
          <div className="step-icon relative z-[10] h-[clamp(40px,5vw,100px)] w-[clamp(40px,5vw,100px)] flex items-center justify-center">
            <IconStepTwo highlight className="absolute w-[clamp(40px,5vw,100px)] h-auto" />
          </div>
        )}
      />
      <div className="relative w-full flex-1 flex">
        <StepTwoIllo />
      </div>
    </section>
  )
}