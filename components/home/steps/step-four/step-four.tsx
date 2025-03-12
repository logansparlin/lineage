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
    <section className={className} ref={stepFourRef}>
      <StepDetails
        step={4}
        title={title}
        description={description}
        icon={(
          <div className="step-icon will-change-transform relative z-[5] h-[clamp(40px,6vw,120px)] w-[clamp(40px,6vw,120px)]">
            <IconStepFour highlight className="w-full h-auto" />
          </div>
        )}
      />
      <div className="relative z-[2] w-full min-h-screen-200 flex items-start">
        <StepFourIllo />
      </div>
    </section>
  )
}