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
    <section className="md:flex-1 md:flex md:flex-col md:items-center" ref={stepOneRef}>
      <StepDetails
        step={1}
        title={title}
        description={description}
        icon={(
          <div className="step-icon relative z-[10] h-[clamp(30px,4vw,80px)] w-[clamp(30px,4vw,80px)]">
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