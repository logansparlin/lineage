import { InternalLink } from "@/sanity.types"

interface GetRelativePathProps {
  slug?: string,
  type?: string
}

export const getRelativePath = ({ slug, type }: GetRelativePathProps): string => {
  switch (type) {
    case 'homePage':
      return `/`
    default:
      return `/${slug}`
  }
}