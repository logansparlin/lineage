'use client'

import { type FC, type ComponentProps, useRef } from "react";
import { useStepOneAnimation } from "./use-step-one-animation";

import { StepDetails } from "../step-details";
import { IconStepOne } from "@/components/icons/icon-step-one";
import { StepOneIllo } from "./step-one-illo";

interface StepOneProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepOne: FC<StepOneProps> = ({ title, description, className = '', ...rest }) => {
  const stepOneRef = useRef<HTMLDivElement>(null);

  useStepOneAnimation(stepOneRef);

  return (
    <section className={className} ref={stepOneRef}>
      <StepDetails
        step={1}
        title={title}
        description={description}
        icon={(
          <div className="step-icon relative z-[10] h-[clamp(40px,6vw,120px)] w-[clamp(40px,6vw,120px)]">
            <IconStepOne
              highlight
              className="w-full h-auto"
            />
          </div>
        )}
      />
      <div className="relative self-start w-full min-h-screen-200">
        <StepOneIllo />
      </div>
    </section>
  )
}