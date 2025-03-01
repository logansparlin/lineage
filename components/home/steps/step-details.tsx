import { type FC, type ComponentProps, type ReactNode } from "react";

interface StepDetailsProps extends ComponentProps<'div'> {
  step: number
  title: string
  description: string
  icon: ReactNode
}

export const StepDetails: FC<StepDetailsProps> = (props) => {
  const { step, title, description, icon, className: _, ...rest } = props

  return (
    <div className="flex items-start gap-x-20" {...rest}>
      <div className="pr-5">
        {icon}
      </div>
      <div className="w-160 py-30">
        <div className="w-full bg-white h-1"></div>
      </div>
      <div className="flex flex-col gap-y-20 max-w-330 pt-13">
        <div className="text-20 px-16 py-3 border-1 border-white rounded-30 self-start">Step {step}</div>
        <div className="flex flex-col gap-y-10">
          <h2 className="text-29">{title}</h2>
          <p className="text-14 font-mono">{description}</p>
        </div>
      </div>
    </div>
  )
}