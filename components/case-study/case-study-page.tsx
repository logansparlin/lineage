import { useMemo } from "react";
import { getStepColors, getStepColorsRGB } from "@/lib/get-step-colors";

import { Modules } from "../modules"
import { CaseStudyIntro } from "./case-study-intro";
import { SetCurrentStep } from "./set-current-step";
import { CaseStudyCanvas } from "./case-study-canvas";
import { CaseNavigationSetters } from "./case-navigation-setters";
import { NextCaseStudyPreview } from "./next-case-study-preview";

export const CaseStudyPage = (props) => {
  const { content, slug, step, all, next } = props;

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

  const stepColorsRGB = useMemo(() => {
    return getStepColorsRGB(step)
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
        
        <CaseStudyIntro {...props} />

        <Modules modules={content} />
        {next?.slug ? (
          <NextCaseStudyPreview {...next} />
        ) : null}
      </div>
      <CaseStudyCanvas
        colors={[
          stepColorsRGB?.[100],
          stepColorsRGB?.[200],
          stepColorsRGB?.[300],
          stepColorsRGB?.[400],
        ]}
      />
    </div>
  )
}
