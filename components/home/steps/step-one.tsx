import { type FC, type ComponentProps } from "react";

import { StepDetails } from "./step-details";
import { IconStepOne } from "@/components/icons/icon-step-one";

interface StepOneProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepOne: FC<StepOneProps> = ({ title, description, ...rest }) => {
  return (
    <section {...rest}>
      <StepDetails
        step={1}
        title={title}
        description={description}
        icon={<IconStepOne className="h-60 w-auto text-orange-200" />}
      />
    </section>
  )
}