import { useMetadata } from "@/hooks/use-metadata"
import { legalPageQuery, legalPagePathsQuery } from "@/sanity/queries/legal"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"

import { LegalPage } from "@/components/legal/legal-page"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  
  const { data: page } = await sanityFetch({ query: legalPageQuery, params: { slug } })

  const seoData = {
    title: page?.seo?.title || page?.title,
    ...page?.seo
  }

  return useMetadata({ data: seoData })
}

export default async function LegalPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const { data: page} = await sanityFetch({ query: legalPageQuery, params: { slug } })
  
  return <LegalPage {...page} />
}

export async function generateStaticParams() {
  const slugs = await client.fetch(legalPagePathsQuery);

  return slugs.map((slug: { slug: string }) => ({ slug: slug.slug }));
}