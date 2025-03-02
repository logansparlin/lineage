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
          <div className="step-icon h-[clamp(30px,4vw,100px)] w-[clamp(30px,4vw,100px)]">
            <IconStepFour highlight className="w-full h-auto" />
          </div>
        )}
      />
      <StepFourIllo />
    </section>
  )
}