export const getRelativePath = ({ type, slug }: { type: string, slug?: string }) => {
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