import { type FC } from 'react'
import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react'

interface SitePortableTextProps {
  value: PortableTextBlock[]
}

const siteComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-18 lg:text-23 pb-24 lg:pb-32 font-medium">{children}</p>
  }
}

export const SitePortableText: FC<SitePortableTextProps> = ({ value }) => {
  return <PortableText value={value} components={siteComponents} />
}