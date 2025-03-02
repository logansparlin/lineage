import { type FC, type ComponentProps } from "react";

import { StepDetails } from "./step-details";
import { IconStepOne } from "@/components/icons/icon-step-one";
import { StepOneIllo } from "./step-one-illo";

interface StepOneProps extends ComponentProps<'section'> {
  title: string
  description: any
}

export const StepOne: FC<StepOneProps> = ({ title, description, className = '', ...rest }) => {
  return (
    <section className={className}>
      <StepDetails
        step={1}
        title={title}
        description={description}
        icon={(
          <div className="h-[clamp(30px,4vw,100px)] w-[clamp(30px,4vw,100px)]">
            <IconStepOne
              highlight
              className="w-full h-auto"
            />
          </div>
        )}
      />
      <StepOneIllo />
    </section>
  )
}