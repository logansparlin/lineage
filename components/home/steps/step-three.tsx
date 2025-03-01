import { type FC, type ComponentProps } from "react";

import { StepDetails } from "./step-details";
import { IconStepThree } from "@/components/icons/icon-step-three";

interface StepThreeProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepThree: FC<StepThreeProps> = ({ title, description, ...rest }) => {
  return (
    <section {...rest}>
      <StepDetails
        step={3}
        title={title}
        description={description}
        icon={<IconStepThree className="h-60 w-auto text-blue-200" />}
      />
    </section>
  )
}