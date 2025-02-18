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
              <p className="text-23 pb-30">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className="text-41 pt-30 pb-20">{children}</h2>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-[square] pl-32 pb-30 text-23 flex flex-col gap-y-5">
                {children}
              </ul>
            ),
          },
        }}
      />
    </div>
  )
}