interface GetRelativePathProps {
  slug?: string,
  type?: string
}

export const getRelativePath = ({ slug, type }: GetRelativePathProps): string => {
  switch (type) {
    case 'homePage':
      return '/'
    case 'caseStudies':
      return '/#case-studies'
    case 'teamPage':
      return '/team'
    case 'legalPage':
      return `/legal/${slug}`
    default:
      return `/${slug}`
  }
}