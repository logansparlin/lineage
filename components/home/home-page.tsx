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

      <div className="w-full min-h-screen flex flex-col items-center relative z-[3] -mt-[20svh]">
        <h2 className="text-58 text-center max-w-700">The operating system that makes brand matter</h2>
      </div>

      {/* Projects */}
      <div className="relative z-[3] bg-black">
        {caseStudies?.map(caseStudy => {
          return (
            <div
              key={caseStudy._id}
              className={`h-screen sticky top-0 flex items-center justify-center text-58 perspective-[1200px]`}
            >
              <Link
                href={`/case-study/${caseStudy.slug}`}
                className={`flex items-center justify-center translate-z-[-50vh] translate-y-[-50vh] w-full h-full ${colorMap[caseStudy.palette]} rotate-x-[-90deg]`}
              >
                {caseStudy.title}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
};

