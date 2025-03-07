import { SitePortableText } from '@/components/global/site-portable-text';
import { type FC, type ComponentProps } from 'react';
import { StepOne } from './step-one/step-one';
import { StepTwo } from './step-two/step-two';
import { StepThree } from './step-three/step-three';
import { StepFour } from './step-four/step-four';
import { StepsIntro } from './steps-intro';

interface StepsSectionProps extends ComponentProps<'section'> {
  intro: {
    heading: string;
    subheading: string;
    splitDescription: {
      headingOne: string;
      descriptionOne: string;
      headingTwo: string;
      descriptionTwo: string;
    };
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
    <section className="w-full flex flex-col items-center relative z-[3]" {...rest}>
      {intro ? <StepsIntro {...intro} /> : null}

      <div className="w-full relative flex flex-col items-center gap-y-250 pt-100 -mb-screen">
        <StepOne
          className="relative w-full flex flex-col gap-y-180"
          {...one}
        />

        <StepTwo
          className="relative w-full flex flex-col gap-y-180"
          {...two}
        />

        <StepThree
          className="relative w-full flex flex-col gap-y-180"
          {...three}
        />

        <StepFour
          className="relative w-full flex flex-col gap-y-180"
          {...four}
        />
      </div>

      {/* Step Navigation */}
      <div className="w-full h-screen sticky bottom-0 z-[12] flex items-center justify-start px-40">
        <div className="w-fit flex flex-col justify-center gap-y-0 text-18 text-center py-18 bg-[rgba(255,255,255,0.1)] border-1 border-white/20 rounded-30 backdrop-blur-[20px]">
          <div className="px-14 py-12 opacity-30 active:opacity-100 hover:opacity-100 transition-opacity duration-300 ease">1</div>
          <div className="px-14 py-12 opacity-30 active:opacity-100 hover:opacity-100 transition-opacity duration-300 ease">2</div>
          <div className="px-14 py-12 opacity-30 active:opacity-100 hover:opacity-100 transition-opacity duration-300 ease">3</div>
          <div className="px-14 py-12 opacity-30 active:opacity-100 hover:opacity-100 transition-opacity duration-300 ease">4</div>
        </div>
      </div>
    </section>
  )
}