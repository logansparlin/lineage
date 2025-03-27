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
    <div className="step-details px-20 md:px-0 relative z-[3] w-full max-md:flex max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-50 grid grid-cols-2 gap-0">
      <div className="relative md:col-start-2 md:row-start-1 md:self-start flex items-center gap-x-24 pointer-events-none select-none">
        <span className="block md:-translate-x-1/2 md:-translate-y-[calc(50%-16px)]">{icon}</span>
      </div>
      <div className="text-center md:text-left md:col-start-2 md:row-start-1 flex items-center md:items-start gap-x-24 md:pl-[4vw]">
        <div className="hidden md:block w-180 h-1 rounded-full mt-16 bg-white" />
        <div className="flex flex-col items-center md:items-start gap-y-15 max-w-330">
          <StepBadge step={step} />
          <div className="flex flex-col gap-y-10">
            <h2 className="text-26">{title}</h2>
            <p className="text-14 font-mono">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}