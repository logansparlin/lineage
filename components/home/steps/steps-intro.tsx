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
    <section className="flex flex-col gap-y-60" {...rest}>
      <div className="w-full flex flex-col items-center justify-center gap-y-40">
        <h2 className="text-58 text-center w-full max-w-650">{heading}</h2>
        <p className="text-18 lg:text-29 w-full max-w-820">{subheading}</p>
      </div>

      {splitDescription ? (
        <div className="flex items-center justify-center gap-x-50">
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

      <div className="w-full max-w-820 text-18 lg:text-29">
        <SitePortableText value={description} />
      </div>
    </section>
  )
}