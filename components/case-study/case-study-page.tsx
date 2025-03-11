import { useMemo } from "react";
import { getStepColors, getStepColorsRGB } from "@/lib/get-step-colors";

import { Modules } from "../modules"
import { StepText } from "../steps/step-text"
import { BackgroundTrail } from "../background-trail/background-trail";
import { SetCurrentStep } from "./set-current-step";

export const CaseStudyPage = (props) => {
  const { content, title, step, description } = props;

  const stepColors = useMemo(() => {
    return getStepColors(step)
  }, [step])

  const stepColorsRGB = useMemo(() => {
    return getStepColorsRGB(step)
  }, [step])

  return (
    <div
      className="md:w-fit md:h-screen md:flex md:items-center"
      style={{
        '--step-color-100': stepColors[100],
        '--step-color-200': stepColors[200],
        '--step-color-300': stepColors[300],
        '--step-color-400': stepColors[400],
      } as React.CSSProperties}
    >
      <SetCurrentStep step={step} />
      <div className="pt-90 md:pt-0 relative z-[1] w-full md:h-screen md:w-fit flex flex-col md:flex-row gap-y-40 md:gap-y-0 md:gap-x-150">
        
        <div className="px-20 md:px-0 md:w-screen md:max-w-960 md:pl-100 md:h-screen flex flex-col items-start justify-center gap-60 md:gap-130">
          <div className="flex flex-col gap-y-4 md:gap-y-20">
            <h1 className="text-46 md:text-case-title">{title}</h1>
            <StepText step={step} />
          </div>

          <p className="text-18 md:text-23 max-w-600 font-medium">{description}</p>
        </div>

        <Modules modules={content} />
      </div>
      {/* <BackgroundTrail colors={[stepColorsRGB[400], stepColorsRGB[300], stepColorsRGB[200], stepColorsRGB[100]]} /> */}
    </div>
  )
}