import { groq } from "next-sanity";

export const imageFields = groq`
  _key,
  _type,
  asset,
  alt,
  "aspectRatio": asset -> metadata.dimensions.aspectRatio,
  "lqip": asset -> metadata.lqip
`

export const videoFields = groq`
  _key,
  _type,
  "url": asset -> url,
  aspectRatio
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

export const mediaFields = groq`
  _key,
  _type,
  mediaType,
  image {
    ${imageFields}
  },
  video {
    ${videoFields}
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
      asset-> {
        _ref,
        url
      }
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
        asset-> {
          _ref,
          url
        }
      },
      videoThumbnail,
      caption
    },
    secondMedia {
      mediaType,
      image,
      video {
        asset-> {
          _ref,
          url
        }
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
        asset-> {
          _ref,
          url
        }
      },
      videoThumbnail,
      text
    },
    secondMedia {
      mediaType,
      image,
      video {
        asset-> {
          _ref,
          url
        }
      },
      videoThumbnail,
      text
    }
  }
`