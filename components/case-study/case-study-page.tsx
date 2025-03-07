import { useMemo } from "react";
import { getStepColors, getStepColorsRGB } from "@/lib/get-step-colors";

import { Modules } from "../modules"
import { StepText } from "../steps/step-text"
import { BackgroundTrail } from "../background-trail/background-trail";

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
      className="w-fit h-screen"
      style={{
        '--step-color-100': stepColors[100],
        '--step-color-200': stepColors[200],
        '--step-color-300': stepColors[300],
        '--step-color-400': stepColors[400],
      } as React.CSSProperties}
    >
      <div className="relative z-[1] h-screen w-fit flex gap-x-150">
        <div className="w-screen max-w-960 pl-100 h-screen flex flex-col items-start justify-center gap-130">
          <div className="flex flex-col gap-y-20">
            <h1 className="text-case-title">{title}</h1>
            <StepText step={step} />
          </div>

          <p className="text-23 max-w-600 font-medium">{description}</p>
        </div>
        <Modules modules={content} />
      </div>
      <BackgroundTrail colors={[stepColorsRGB[400], stepColorsRGB[300], stepColorsRGB[200], stepColorsRGB[100]]} />
    </div>
  )
}