import { type FC, type ComponentProps } from "react";
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

  return (
    <section className="px-20 flex flex-col items-center text-center gap-y-72 pb-60 md:pb-100" {...rest}>
      <div className="w-full flex flex-col items-center justify-center md:gap-y-32">
        <h2 className="text-32 md:text-58 w-full max-w-650 text-balance">{heading}</h2>
        <p className="text-20 lg:text-29 w-full max-w-820">{subheading}</p>
      </div>

      {splitDescription ? (
        <div className="max-md:w-full flex flex-col md:flex-row items-center justify-center md:gap-x-50">
          <SplitDescriptionContainer
            side="left"
            heading={splitDescription.headingOne}
            description={splitDescription.descriptionOne}
          />

          <SplitDescriptionContainer
            side="right"
            heading={splitDescription.headingTwo}
            description={splitDescription.descriptionTwo}
          />
        </div>
      ) : null}

      <div className="w-full max-w-850 text-18 lg:text-29 md:pt-60">
        <SitePortableText value={description} />
      </div>
    </section>
  )
}