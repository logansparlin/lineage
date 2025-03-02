import { type FC, type ComponentProps } from "react";

import { StepDetails } from "./step-details";
import { IconStepFour } from "@/components/icons/icon-step-four";
import { StepFourIllo } from "./step-four-illo";

interface StepFourProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepFour: FC<StepFourProps> = ({ title, description, className = '', ...rest }) => {
  return (
    <section className={className}>
      <StepDetails
        step={4}
        title={title}
        description={description}
        icon={(
          <div className="h-[clamp(30px,4vw,100px)] w-[clamp(30px,4vw,100px)]">
            <IconStepFour highlight className="w-full h-auto" />
          </div>
        )}
      />
      <StepFourIllo />
    </section>
  )
}