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
    controls,
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
    image {
      ${imageFields}
    }
  },
  _type == 'quoteMedia' => {
    _type,
    _key,
    text,
    attribution,
    mediaPosition,
    mediaType,
    image {
      ${imageFields}
    },
    video {
      ${muxVideoFields}
    },
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
    controls,
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
      controls,
      caption
    },
    secondMedia {
      mediaType,
      image,
      video {
        ${muxVideoFields}
      },
      videoThumbnail,
      controls,
      caption
    }
  },
  _type == 'triptych' => {
    _type,
    _key,
    reversed,
    firstMedia {
      mediaType,
      image {
        ${imageFields}
      },
      video {
        ${muxVideoFields}
      },
      videoThumbnail,
      controls,
      caption
    },
    secondMedia {
      mediaType,
      image {
        ${imageFields}
      },
      video {
        ${muxVideoFields}
      },
      videoThumbnail,
      controls,
      caption
    },
    thirdMedia {
      mediaType,
      image {
        ${imageFields}
      },
      video {
        ${muxVideoFields}
      },
      videoThumbnail,
      controls,
      caption
    }
  },
  _type == 'mediaGrid' => {
    _type,
    _key,
    items[] {
      ${mediaFields}
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
      controls,
      text,
      caption
    },
    secondMedia {
      mediaType,
      image,
      video {
        ${muxVideoFields}
      },
      videoThumbnail,
      controls,
      text,
      caption
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