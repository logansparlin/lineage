import { Footer } from "../global/footer";
import { CaseStudies } from "./case-studies/case-studies";
import { HomeScrim } from "./home-scrim";
import { HomeIntro } from "./intro/home-intro";
import { ScrollToCaseStudies } from "./scroll-to-case-studies";
import { StepsSection } from "./steps/steps-section";

export interface HomePageProps {
  title: string
  intro: {
    titles: {
      _key: string
      text: string
      svg: any
    }[]
    description: string
  }
  caseStudies: any[]
  steps: {
    intro: {
      heading: string
      subheading: string
      splitDescription: {
        headingOne: string
        descriptionOne: string
        headingTwo: string
        descriptionTwo: string
      }
      description: any
    }
    one: {
      title: string
      description: any
    },
    two: {
      title: string
      description: any
    },
    three: {
      title: string
      description: any
    },
    four: {
      title: string
      description: any
    }
  }
}

export const HomePage = (props: HomePageProps) => {
  const { title, intro, caseStudies, steps } = props

  return (
    <div className="relative z-[2] w-full select-none">
      <h1 className="sr-only">{title}</h1>

      <ScrollToCaseStudies />

      <HomeIntro titles={intro.titles} description={intro.description} />

      <StepsSection {...steps} />

      <CaseStudies items={caseStudies} />

      <Footer />
      
      <HomeScrim />
    </div>
  );
};
