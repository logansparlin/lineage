import { CaseStudies } from "./case-studies/case-studies";
import { HomeIntro } from "./intro/home-intro";
import Link from "next/link";

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
  }[]
}

export const HomePage = (props: HomePageProps) => {
  if (!props) return null

  const { title, intro, caseStudies } = props

  return (
    <div className="relative select-none">
      <h1 className="sr-only">{title}</h1>
      <HomeIntro titles={intro.titles} description={intro.description} />

      {/* Info Section */}

      <div className="w-full flex flex-col items-center relative z-[3] -mt-[20svh]">
        <h2 className="text-58 text-center max-w-700">The operating system that makes brand matter</h2>
      </div>

      {/* Projects */}
      <CaseStudies items={caseStudies} />
    </div>
  );
};
