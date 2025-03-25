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
    <section className="flex-1 flex flex-col gap-y-40 md:gap-y-0 items-center" ref={stepThreeRef}>
      <StepDetails
        step={3}
        title={title}
        description={description}
        icon={(
          <div className="step-icon will-change-transform relative z-[4] w-64 h-64 md:h-[clamp(60px,4.25vw,80px)] md:w-[clamp(60px,4.25vw,80px)]">
            <IconStepThree highlight className="relative z-[2] w-full h-auto" />
            <div className="tracking-circle tracking-circle-one w-full h-full bg-linear-to-b from-blue-200 to-blue-300 rounded-full absolute z-[1] inset-0 opacity-30 scale-0" data-scale="3.75" />
            <div className="tracking-circle tracking-circle-two w-full h-full bg-linear-to-t from-blue-200 to-blue-300 rounded-full absolute z-[1] inset-0 opacity-20 scale-0" data-scale="2.5" />
          </div>
        )}
      />
      <div className="relative z-[2] w-full flex-1 flex items-start">
        <StepThreeIllo />
      </div>
    </section>
  )
}