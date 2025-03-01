import { SitePortableText } from '@/components/global/site-portable-text';
import { type FC, type ComponentProps } from 'react';
import { StepOne } from './step-one';
import { StepTwo } from './step-two';
import { StepThree } from './step-three';
import { StepFour } from './step-four';

interface StepsSectionProps extends ComponentProps<'section'> {
  intro: {
    heading: string;
    subheading: string;
    description: any;
  },
  one: {
    title: string;
    description: any;
  },
  two: {
    title: string;
    description: any;
  },
  three: {
    title: string;
    description: any;
  },
  four: {
    title: string;
    description: any;
  }
}

export const StepsSection: FC<StepsSectionProps> = (props) => {
  const { intro, one, two, three, four, ...rest } = props;

  if (!intro) return null;

  return (
    <section className="w-full flex flex-col items-center gap-y-60 relative z-[3] -mt-[130svh]" {...rest}>
      {/* Intro */}
      <div className="flex flex-col gap-y-60">
        <div className="w-full flex flex-col items-center justify-center gap-y-40">
          <h2 className="text-58 text-center w-full max-w-650">{intro.heading}</h2>
          <p className="text-18 lg:text-29 w-full max-w-820">{intro.subheading}</p>
        </div>

        <div className="w-full max-w-820 text-18 lg:text-29">
          <SitePortableText value={intro.description} />
        </div>
      </div>

      <StepOne {...one} />
      <StepTwo {...two} />
      <StepThree {...three} />
      <StepFour {...four} />

      {/* Step Navigation */}
      <div className="w-full sticky bottom-1/2 translate-y-1/2 px-40">
        <div className="w-fit flex flex-col justify-center gap-y-0 text-18 text-center py-18 bg-white/10 border-1 border-white/20 rounded-30">
          <div className="px-16 py-12 opacity-30 active:opacity-100 hover:opacity-100 transition-opacity duration-300 ease">1</div>
          <div className="px-16 py-12 opacity-30 active:opacity-100 hover:opacity-100 transition-opacity duration-300 ease">2</div>
          <div className="px-16 py-12 opacity-30 active:opacity-100 hover:opacity-100 transition-opacity duration-300 ease">3</div>
          <div className="px-16 py-12 opacity-30 active:opacity-100 hover:opacity-100 transition-opacity duration-300 ease">4</div>
        </div>
      </div>
    </section>
  )
}