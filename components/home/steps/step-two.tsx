import { type FC, type ComponentProps } from "react";

import { StepDetails } from "./step-details";
import { IconStepTwo } from "@/components/icons/icon-step-two";
import { StepTwoIllo } from "./step-two-illo";

interface StepTwoProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepTwo: FC<StepTwoProps> = ({ title, description, className = '', ...rest }) => {
  return (
    <section className={className}>
      <StepDetails
        step={2}
        title={title}
        description={description}
        icon={(
          <div className="h-[clamp(30px,4vw,100px)] w-[clamp(30px,4vw,100px)] flex items-center justify-center">
            <IconStepTwo highlight className="absolute h-[clamp(24px,2.5vw,80px)] w-auto" />
          </div>
        )}
      />
      <StepTwoIllo />
    </section>
  )
}