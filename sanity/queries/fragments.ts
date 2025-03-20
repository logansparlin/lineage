import { groq } from "next-sanity";

export const imageFields = groq`
  _key,
  _type,
  asset,
  alt,
  "aspectRatio": asset -> metadata.dimensions.aspectRatio,
  "width": asset -> metadata.dimensions.width,
  "height": asset -> metadata.dimensions.height,
  "lqip": asset -> metadata.lqip
`

export const muxVideoFields = groq`
  _key,
  _type,
  "playbackId": asset-> playbackId,
  "duration": asset-> data.duration,
  "aspectRatio": asset->data.aspect_ratio,
`

export const mediaFields = groq`
  _key,
  _type,
  mediaType,
  caption,
  mediaType == 'image' => {
    image {
      ${imageFields}
    }
  },
  mediaType == 'video' => {
    video {
      ${muxVideoFields}
    }
  }
`

export const linkFields = groq`
  _key,
  _type,
  label,
  to -> {
    _type,
    "slug": slug.current
  }
`

export const seoQuery = groq`
seo {
  title,
  description,
  ogImage {
    ${imageFields}
  }
}
`

export const modulesFields = groq`
  _type == 'quote' => {
    _type,
    _key,
    text,
    attribution,
    size,
    image
  },
  _type == 'mediaBlock' => {
    _type,
    _key,
    mediaType,
    size,
    caption,
    image,
    video {
      ${muxVideoFields}
    },
    videoThumbnail,
  },
  _type == 'textBlock' => {
    _type,
    _key,
    headline,
    text,
    hasSecondColumn,
    secondColumnText
  },
  _type == 'diptych' => {
    _type,
    _key,
    reversed,
    firstMedia {
      mediaType,
      image,
      video {
        ${muxVideoFields}
      },
      videoThumbnail,
      caption
    },
    secondMedia {
      mediaType,
      image,
      video {
        ${muxVideoFields}
      },
      videoThumbnail,
      caption
    }
  },
  _type == 'offsetMedia' => {
    _type,
    _key,
    firstMedia {
      mediaType,
      image,
      video {
        ${muxVideoFields}
      },
      videoThumbnail,
      text
    },
    secondMedia {
      mediaType,
      image,
      video {
        ${muxVideoFields}
      },
      videoThumbnail,
      text
    }
  },
  _type == 'mediaCarousel' => {
    _type,
    _key,
    items[] {
      ${mediaFields}
    }
  }
`