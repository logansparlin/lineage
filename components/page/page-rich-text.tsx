import { type FC } from "react"
import { type PortableTextBlock } from "next-sanity"

import { PortableText } from "@portabletext/react"
import { ExpandableList } from "./expandable-list"

interface PageRichTextProps {
  content: PortableTextBlock[]
}

export const PageRichText: FC<PageRichTextProps> = ({ content }) => {
  return (
    <div>
      <PortableText
        value={content}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="text-18 md:text-23 pb-20 md:pb-30">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className="text-32 md:text-41 pt-30 pb-10 md:pb-20 first-of-type:pt-0">{children}</h2>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-[square] pl-32 pb-20 md:pb-30 text-18 md:text-23 flex flex-col gap-y-5">
                {children}
              </ul>
            ),
          },
          types: {
            expandableList: ({ value }) => (
              <ExpandableList
                {...value}
              />
            )
          }
        }}
      />
    </div>
  )
}