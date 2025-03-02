import { StepBadge } from "@/components/steps/step-badge";
import { type FC, type ComponentProps, type ReactNode } from "react";

interface StepDetailsProps extends ComponentProps<'div'> {
  step: number
  title: string
  description: string
  icon: ReactNode
}

export const StepDetails: FC<StepDetailsProps> = (props) => {
  const { step, title, description, icon, className, ...rest } = props

  return (
    <>
      <div className="sticky top-180 col-start-2 row-start-1 self-start flex items-center gap-x-24">
        <span className="block -translate-x-1/2 -translate-y-[calc(50%-16px)]">{icon}</span>
      </div>
      <div className="col-start-2 row-start-1 flex items-start gap-x-24 pl-50">
        <div className="w-150 h-1 mt-15 bg-white" />
        <div className="flex flex-col items-start gap-y-20 max-w-330">
          <StepBadge step={step} />
          <div className="flex flex-col gap-y-10">
            <h2 className="text-29">{title}</h2>
            <p className="text-14 font-mono">{description}</p>
          </div>
        </div>
      </div>
    </>
  )
}