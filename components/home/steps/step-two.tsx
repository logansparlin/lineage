import { type FC, type ComponentProps } from "react";

import { StepDetails } from "./step-details";
import { IconStepTwo } from "@/components/icons/icon-step-two";

interface StepTwoProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepTwo: FC<StepTwoProps> = ({ title, description, ...rest }) => {
  return (
    <section {...rest}>
      <StepDetails
        step={2}
        title={title}
        description={description}
        icon={<IconStepTwo className="h-60 w-auto text-green-200" />}
      />
    </section>
  )
}