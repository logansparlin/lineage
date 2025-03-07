import { type FC, type ComponentProps } from 'react';

import { StepOne } from './step-one/step-one';
import { StepTwo } from './step-two/step-two';
import { StepThree } from './step-three/step-three';
import { StepFour } from './step-four/step-four';
import { StepsIntro } from './steps-intro';
import { StepObserver } from './step-observer';
import { StepsNavigation } from './steps-navigation';

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
        <StepObserver step="one">
          <StepOne
            className="relative w-full flex flex-col gap-y-180"
            {...one}
          />
        </StepObserver>

        <StepObserver step="two">
          <StepTwo
            className="relative w-full flex flex-col gap-y-180"
            {...two}
          />
        </StepObserver>

        <StepObserver step="three">
          <StepThree
            className="relative w-full flex flex-col gap-y-180"
            {...three}
          />
        </StepObserver>

        <StepObserver step="four">
          <StepFour
            className="relative w-full flex flex-col gap-y-180"
            {...four}
          />
        </StepObserver>
      </div>

      {/* Step Navigation */}
      <StepsNavigation />
    </section>
  )
}