import Link from "next/link";
import { TestScene } from "./test-scene";

export interface HomePageProps {
  title: string
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

  const { title, caseStudies } = props

  return (
    <div className="relative select-none">
      <h1 className="sr-only">{title}</h1>
      <div className="relative w-full z-[1] min-h-[200svh]">
        <TestScene />
        <div className="sticky top-0 min-h-screen mt-[-100svh] flex items-center justify-center cursor-none text-58 z-[2]">
          <h2>Be Real</h2>
        </div>
      </div>
      <div className="relative z-[3]">
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

