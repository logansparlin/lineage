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
    <section className="flex-1 flex flex-col items-center gap-y-32 md:gap-y-24 pt-14" ref={stepTwoRef}>
      <StepDetails
        step={2}
        title={title}
        description={description}
        icon={(
          <div className="step-icon origin-top relative z-[10] w-auto h-50 md:h-[clamp(45px,4.25vw,50px)] md:w-auto flex items-center justify-center">
            <IconStepTwo highlight className="h-full w-auto" />
          </div>
        )}
      />
      <div className="relative w-full flex-1 flex">
        <StepTwoIllo />
      </div>
    </section>
  )
}