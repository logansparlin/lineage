'use client'

import { type FC, type ComponentProps, useRef } from "react";
import { useStepThreeAnimation } from "./use-step-three-animation";

import { StepDetails } from "../step-details";
import { IconStepThree } from "@/components/icons/icon-step-three";
import { StepThreeIllo } from "./step-three-illo";

interface StepThreeProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepThree: FC<StepThreeProps> = ({ title, description, className = '', ...rest }) => {
  const stepThreeRef = useRef<HTMLDivElement>(null);

  useStepThreeAnimation(stepThreeRef);

  return (
    <section className={className} ref={stepThreeRef}>
      <StepDetails
        step={3}
        title={title}
        description={description}
        icon={(
          <div className="step-icon h-[clamp(30px,4vw,100px)] w-[clamp(30px,4vw,100px)]">
            <IconStepThree highlight className="w-full h-auto" />
          </div>
        )}
      />
      <StepThreeIllo />
    </section>
  )
}