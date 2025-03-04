import { Footer } from "../global/footer";
import { CaseStudies } from "./case-studies/case-studies";
import { HomeScrim } from "./home-scrim";
import { HomeIntro } from "./intro/home-intro";
import { HomeScrollScene } from "./intro/home-scroll-scene";
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
  caseStudies: {
    _id: string
    title: string
    slug: string
    palette: string
    featuredImage: any
    shortDescription: string
    isMain?: boolean
  }[]
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
  if (!props) return null

  const { title, intro, caseStudies, steps } = props

  return (
    <div className="relative select-none">
      <h1 className="sr-only">{title}</h1>

      <HomeIntro titles={intro.titles} description={intro.description} />

      <StepsSection {...steps} />

      <div className="h-[200svh] w-full bg-transparent" />

      <CaseStudies items={caseStudies} />
      
      <HomeScrollScene />

      <Footer />
      
      <HomeScrim />
    </div>
  );
};
