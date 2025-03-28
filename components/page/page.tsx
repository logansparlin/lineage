import { type FC } from "react"
import { type PortableTextBlock } from "next-sanity"

import { PageRichText } from "./page-rich-text"
import { FormattedDate } from "../global/formatted-date"
import { PageCanvas } from "./page-canvas"

interface PageProps {
  title: string
  lastUpdated: string
  content: PortableTextBlock[]
}

export const Page: FC<PageProps> = ({ title, lastUpdated, content }) => {
  return (
    <div className="page">
      <div className="flex flex-col gap-y-30 md:gap-y-100 relative z-[2]">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-46 md:text-83">{title}</h1>
          {lastUpdated ? <p className="text-14 font-mono">Last updated <FormattedDate date={lastUpdated} /></p> : null}
        </div>
        <PageRichText content={content} />
      </div>

      <PageCanvas />
    </div>
  )
}