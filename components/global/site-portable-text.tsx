import { type FC } from 'react'
import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react'

interface SitePortableTextProps {
  value: PortableTextBlock[]
}

const siteComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-inherit pb-[1.1em]">{children}</p>
  }
}

export const SitePortableText: FC<SitePortableTextProps> = ({ value }) => {
  return <PortableText value={value} components={siteComponents} />
}