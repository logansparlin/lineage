import { useMemo } from "react";
import { getStepColors } from "@/lib/get-step-colors";

import { Modules } from "../modules"
import { StepText } from "../steps/step-text"
import { CaseStudyCanvas } from "./case-study-canvas";
import { CaseNavigationSetters } from "./case-navigation-setters";
import { SetCurrentStep } from "./set-current-step";

export const CaseStudyPage = (props) => {
  const { content, title, slug, step, description, all } = props;

  const currentIndex = useMemo(() => {
    return all.findIndex((caseStudy) => caseStudy.slug === slug);
  }, [all, slug])

  const nextCaseStudy = useMemo(() => {
    const nextIndex = (currentIndex + 1) % all.length;
    return all[nextIndex];
  }, [all, currentIndex])

  const previousCaseStudy = useMemo(() => {
    const previousIndex = (currentIndex - 1 + all.length) % all.length;
    return all[previousIndex];
  }, [all, currentIndex])

  const stepColors = useMemo(() => {
    return getStepColors(step)
  }, [step])

  return (
    <div
      className="md:w-fit md:h-screen md:flex md:items-center relative z-[2]"
      style={{
        '--step-color-100': stepColors?.[100],
        '--step-color-200': stepColors?.[200],
        '--step-color-300': stepColors?.[300],
        '--step-color-400': stepColors?.[400],
      } as React.CSSProperties}
    >
      <CaseNavigationSetters
        nextCaseStudy={nextCaseStudy}
        previousCaseStudy={previousCaseStudy}
      />
      <SetCurrentStep step={step} />
      <div className="pt-90 md:pt-0 relative z-[2] w-full md:h-screen md:w-fit flex flex-col md:flex-row gap-y-40 md:gap-y-0 md:gap-x-150">
        
        <div className="px-20 md:px-0 md:w-screen md:max-w-960 md:pl-100 md:h-screen flex flex-col items-start justify-center gap-60 md:gap-130">
          <div className="flex flex-col gap-y-4 md:gap-y-20">
            <h1 className="text-46 md:text-case-title">{title}</h1>
            <StepText step={step} />
          </div>

          <p className="text-18 md:text-23 max-w-600 font-medium">{description}</p>
        </div>

        <Modules modules={content} />
      </div>
    </div>
  )
}
