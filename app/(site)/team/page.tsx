import { useMetadata } from "@/hooks/use-metadata"
import { teamPageQuery } from "@/sanity/queries/team"
import { sanityFetch } from "@/sanity/lib/live"
import { notFound } from "next/navigation"

import { TeamPage } from "@/components/team/team-page"

export async function generateMetadata() {
  const { data: page } = await sanityFetch({ query: teamPageQuery })

  const seoData = {
    title: page?.seo?.title || page?.title,
    ...page?.seo
  }

  return useMetadata({ data: seoData })
}

export default async function TeamPageRoute() {
  const { data: page} = await sanityFetch({ query: teamPageQuery })

  if (page?.hidden) {
    return notFound();
  }
  
  return <TeamPage {...page} />
}