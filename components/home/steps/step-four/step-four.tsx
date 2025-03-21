'use client'

import { type FC, type ComponentProps, useRef } from "react";
import { useStepFourAnimation } from "./use-step-four-animation";

import { StepDetails } from "../step-details";
import { IconStepFour } from "@/components/icons/icon-step-four";
import { StepFourIllo } from "./step-four-illo";

interface StepFourProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepFour: FC<StepFourProps> = ({ title, description, className = '', ...rest }) => {
  const stepFourRef = useRef<HTMLDivElement>(null);

  useStepFourAnimation(stepFourRef);

  return (
    <section className="flex-1 flex flex-col items-center gap-y-50" ref={stepFourRef}>
      <StepDetails
        step={4}
        title={title}
        description={description}
        icon={(
          <div className="step-icon relative z-[5] w-70 h-70 md:h-[clamp(60px,4.25vw,80px)] md:w-[clamp(60px,4.25vw,80px)]">
            <IconStepFour highlight className="w-full h-auto" />
          </div>
        )}
      />
      <div className="relative z-[2] w-full flex-1 flex items-start">
        <StepFourIllo />
      </div>
    </section>
  )
}