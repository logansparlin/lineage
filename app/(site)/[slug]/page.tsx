import { useMetadata } from "@/hooks/use-metadata"
import { pageQuery, pagePathsQuery } from "@/sanity/queries/page"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"

import { Page } from "@/components/page/page"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  
  const { data: page } = await sanityFetch({ query: pageQuery, params: { slug } })

  const seoData = {
    title: page?.seo?.title || page?.title,
    ...page?.seo
  }

  return useMetadata({ data: seoData })
}

export default async function LegalPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const { data: page} = await sanityFetch({ query: pageQuery, params: { slug } })
  
  return <Page {...page} />
}

export async function generateStaticParams() {
  const slugs = await client.fetch(pagePathsQuery);

  return slugs.map((slug: { slug: string }) => ({ slug: slug.slug }));
}