import { type FC } from "react"
import { PortableText } from "@portabletext/react"
import { type PortableTextBlock } from "next-sanity"

interface LegalRichTextProps {
  content: PortableTextBlock[]
}

export const LegalRichText: FC<LegalRichTextProps> = ({ content }) => {
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
        }}
      />
    </div>
  )
}