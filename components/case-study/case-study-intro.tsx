import { type FC, useMemo } from "react";
import { getStepColors } from "../../lib/get-step-colors";
import { StepText } from "../steps/step-text";
import Link from "next/link";
import { IconArrowRight } from "../icons/icon-arrow-right";

interface CaseStudyIntroProps {
  title: string;
  description: string;
  step: 'one' | 'two' | 'three' | 'four';
  nextLink?: string;
}


export const CaseStudyIntro: FC<CaseStudyIntroProps> = (props) => {
  const { title, description, step, nextLink } = props;

  const stepColors = useMemo(() => {
    return getStepColors(step)
  }, [step])

  return (
    <section
      className="px-20 md:px-0 md:w-screen md:max-w-960 md:pl-100 md:h-screen flex flex-col items-start justify-center gap-60 md:gap-130"
      style={{
        '--step-color-100': stepColors?.[100],
        '--step-color-200': stepColors?.[200],
        '--step-color-300': stepColors?.[300],
        '--step-color-400': stepColors?.[400],
      } as React.CSSProperties}
    >
      <div className="flex flex-col gap-y-4 md:gap-y-20">
        <h1 className="text-46 md:text-case-title">{title}</h1>
        <StepText step={step} />
      </div>

      {nextLink ? (
        <Link href={nextLink} className="py-8 px-16 md:py-12 md:px-28 border-2 md:border-[2.5px] border-white rounded-full flex items-center justify-center all-interactions:bg-white all-interactions:text-step-400 transition-colors duration-300">
          <IconArrowRight className="h-36 md:h-54 aspect-square" />
        </Link>
      ) : (
        <p className="text-18 md:text-23 max-w-600 font-medium">{description}</p>
      )}
    </section>   
  )
}