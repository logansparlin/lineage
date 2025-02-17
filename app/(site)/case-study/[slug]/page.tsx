import { CaseStudyPage } from "@/components/case-study/case-study-page"
import { useMetadata } from "@/hooks/use-metadata"
import { caseStudyQuery, caseStudyPathsQuery } from "@/sanity/queries/case-study"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  
  const { data: project } = await sanityFetch({ query: caseStudyQuery, params: { slug } })

  const seoData = {
    title: project?.seo?.title || project?.title,
    ...project?.seo
  }

  return useMetadata({ data: seoData })
}

export default async function ProjectRoute({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const { data: page} = await sanityFetch({ query: caseStudyQuery, params: { slug } })
  
  return <CaseStudyPage {...page} />
}

export async function generateStaticParams() {
  const slugs = await client.fetch(caseStudyPathsQuery);

  return slugs.map((slug: { slug: string }) => ({ slug: slug.slug }));
}