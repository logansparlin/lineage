import { type FC, type ComponentProps } from "react";

import { StepDetails } from "./step-details";
import { IconStepFour } from "@/components/icons/icon-step-four";

interface StepFourProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepFour: FC<StepFourProps> = ({ title, description, ...rest }) => {
  return (
    <section {...rest}>
      <StepDetails
        step={4}
        title={title}
        description={description}
        icon={<IconStepFour className="h-60 w-auto text-pink-200" />}
      />
    </section>
  )
}