import { urlFor } from "@/sanity/lib/image";

import { Image } from "@/sanity/types";

interface MetadataFromQuery {
  data: {
    title?: string
    description?: string
    favicon?: {
      one?: Image
      two?: Image
      three?: Image
      four?: Image
    }
    ogImage?: Image
  }
  useTitleTemplate?: boolean
}

export const useMetadata = ({
  data,
  useTitleTemplate = true
}: MetadataFromQuery) => {
  const defaultTitle = 'Lineage'

  if (!data) return {
    title: defaultTitle,
  }

  const favicon = data?.favicon?.one ? urlFor(data?.favicon?.one).url() : ''
  const ogImage = data?.ogImage ? urlFor(data?.ogImage).url() : ''

  const parsedTitle = !data?.title ? defaultTitle : useTitleTemplate ? `${data?.title} | ${defaultTitle}` : data?.title

  return {
    title: parsedTitle,
    ...(data?.description ? { description: data?.description } : {}),
    ...(favicon ? { icons: { icon: favicon } } : {}),
    openGraph: {
      title: parsedTitle,
      ...(data?.description ? { description: data?.description } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      title: parsedTitle,
      ...(data?.description ? { description: data?.description } : {}),
      card: 'summary_large_image',
      ...(ogImage ? { images: [ogImage] } : {}),
    }
  }
}