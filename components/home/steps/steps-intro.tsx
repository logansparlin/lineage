'use client'

import { type FC, type ComponentProps, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useWindowSize } from "react-use";
import { easings } from "@/lib/easings";

import { SitePortableText } from "@/components/global/site-portable-text";
import { SplitDescriptionContainer } from "./split-description-container";

interface StepsIntroProps extends ComponentProps<'section'> {
  heading: string;
  subheading: string;
  description: any;
  splitDescription: {
    headingOne: string;
    descriptionOne: string;
    headingTwo: string;
    descriptionTwo: string;
  };
}

export const StepsIntro: FC<StepsIntroProps> = (props) => {
  const { heading, subheading, splitDescription, description, ...rest } = props;
  const splitDescriptionRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const isInView = useInView(splitDescriptionRef, {
    amount: 0.01,
    margin: width > 800 ? '0px 0px -60% 0px' : '0px 0px -80% 0px',
    once: true
  })

  return (
    <section className="px-20 flex flex-col items-center text-center gap-y-72 pb-60 md:pb-100" {...rest}>
      <div className="w-full flex flex-col items-center justify-center md:gap-y-32">
        <h2 className="text-32 md:text-58 w-full max-w-650 text-balance">{heading}</h2>
        <p className="text-20 lg:text-29 w-full max-w-820">{subheading}</p>
      </div>

      {splitDescription ? (
        <div ref={splitDescriptionRef} className="max-md:w-full flex flex-col md:flex-row items-center justify-center">
          <motion.div
            className="w-full flex items-center justify-center [--y-start:-15px] md:[--y-start:0px] [--x-start:0px] md:[--x-start:-25px]"
            initial={{ y: 'var(--y-start)', x: 'var(--x-start)' }}
            animate={{ y: isInView ? 0 : 'var(--y-start)', x: isInView ? 0 : 'var(--x-start)' }}
            transition={{
              duration: 0.85,
              ease: easings.outExpo
            }}
          >
            <SplitDescriptionContainer
              side="left"
              heading={splitDescription.headingOne}
              description={splitDescription.descriptionOne}
            />
          </motion.div>

          <motion.div
            className="w-full flex items-center justify-center [--y-start:15px] md:[--y-start:0px] [--x-start:0px] md:[--x-start:25px]"
            initial={{ y: 'var(--y-start)', x: 'var(--x-start)' }}
            animate={{ y: isInView ? 0 : 'var(--y-start)', x: isInView ? 0 : 'var(--x-start)' }}
            transition={{
              duration: 0.85,
              ease: easings.outExpo
            }}
          >
            <SplitDescriptionContainer
              side="right"
              heading={splitDescription.headingTwo}
              description={splitDescription.descriptionTwo}
            />
          </motion.div>
        </div>
      ) : null}

      <div className="w-full max-w-850 text-18 lg:text-29 md:pt-60">
        <SitePortableText value={description} />
      </div>
    </section>
  )
}