import { type FC } from "react";

import { StepText } from "../steps/step-text";

interface CaseStudyIntroProps {
  title: string;
  description: string;
  step: 'one' | 'two' | 'three' | 'four';
}


export const CaseStudyIntro: FC<CaseStudyIntroProps> = (props) => {
  const { title, description, step } = props;

  return (
    <section className="px-20 md:px-0 md:w-screen md:max-w-960 md:pl-100 md:h-screen flex flex-col items-start justify-center gap-60 md:gap-130">
      <div className="flex flex-col gap-y-4 md:gap-y-20">
        <h1 className="text-46 md:text-case-title">{title}</h1>
        <StepText step={step} />
      </div>

      <p className="text-18 md:text-23 max-w-600 font-medium">{description}</p>
    </section>   
  )
}