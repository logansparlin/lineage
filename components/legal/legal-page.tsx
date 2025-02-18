import { type FC } from "react"
import { type PortableTextBlock } from "next-sanity"

import { LegalRichText } from "./legal-rich-text"
import { FormattedDate } from "../global/formatted-date"

interface LegalPageProps {
  title: string
  lastUpdated: string
  content: PortableTextBlock[]
}

export const LegalPage: FC<LegalPageProps> = ({ title, lastUpdated, content }) => {
  return (
    <div className="flex flex-col gap-y-100">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-83">{title}</h1>
        {lastUpdated ? <p className="text-14">Last updated <FormattedDate date={lastUpdated} /></p> : null}
      </div>
      <LegalRichText content={content} />
    </div>
  )
}