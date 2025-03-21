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

export const StepOne: FC<StepOneProps> = ({ title, description }) => {
  const stepOneRef = useRef<HTMLDivElement>(null);

  useStepOneAnimation(stepOneRef);

  return (
    <section className="flex-1 flex flex-col items-center gap-y-50 md:gap-y-0" ref={stepOneRef}>
      <StepDetails
        step={1}
        title={title}
        description={description}
        icon={(
          <div className="step-icon relative z-[10] w-70 h-70 md:h-[clamp(60px,4.25vw,80px)] md:w-[clamp(60px,4.25vw,80px)]">
            <IconStepOne
              highlight
              className="w-full h-auto"
            />
          </div>
        )}
      />
      <div className="relative w-full flex-1">
        <StepOneIllo />
      </div>
    </section>
  )
}