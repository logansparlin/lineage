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

const colorMap = {
  orange: 'bg-orange-400',
  green: 'bg-green-400',
  blue: 'bg-blue-400',
  pink: 'bg-pink-400',
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
      <div className="relative z-[3] bg-black">
        <div className="sticky z-[5] w-full h-screen top-0 left-0 perspective-[3500px]">
          <div className="w-full h-full translate-z-[-50vh] translate-y-[-50vh] rotate-x-[-90deg] overflow-hidden">
            <ProjectSection caseStudies={caseStudies} />
          </div>
        </div>
        
        <div className="sticky z-[5] w-full h-screen top-0 bottom-0 perspective-[3500px]">
          <div className="w-full h-full translate-z-[-50vh] translate-y-[50vh] rotate-x-[90deg]">
            <ProjectSection caseStudies={caseStudies} />
          </div>
        </div>

        <div className="w-full h-auto perspective-[3500px]">
          <div className="relative z-[3] translate-z-[-100vh] mt-[-175vh] origin-top">
            <ProjectSection caseStudies={caseStudies} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectSection = (props) => {
  const { caseStudies } = props

  return (
    <div className="w-full bg-[red]">
      {caseStudies?.map(caseStudy => {
        return (
          <div
            key={caseStudy._id}
            className={`h-screen relative flex items-center justify-center text-58`}
          >
            <Link
              href={`/case-study/${caseStudy.slug}`}
            >
              {caseStudy.title}
            </Link>
          </div>
        )
      })}
    </div>
  )
}