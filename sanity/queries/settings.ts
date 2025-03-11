import { defineQuery, groq } from "next-sanity";
import { linkFields, imageFields } from "./fragments";

export const settingsHeaderQuery = defineQuery(
  groq`*[_type == "settingsHeader"][0] {
    links[] {
      ${linkFields}
    },
    contact {
      label,
      url,
      content[] {
        _key,
        _type,
        label,
        url
      }
    },
    information {
      label,
      content
    },
    "projectCount": count(*[_type == "projectPage"])
  }`
)

export const settingsFooterQuery = defineQuery(
  groq`*[_type == "settingsFooter"][0] {
    columns[] {
      _key,
      text
    },
    externalLinks[] {
      _key,
      label,
      url
    }
  }`
)

export const settingsSeoQuery = defineQuery(
  groq`*[_type == "settingsSeo"][0] {
    title,
    description,
    favicon {
      one {
        ${imageFields}
      },
      two {
        ${imageFields}
      },
      three {
        ${imageFields}
      },
      four {
        ${imageFields}
      }
    },
    ogImage {
      ${imageFields}
    }
  }`
)

export const settingsQuery = defineQuery(
  groq`{
    "seo": ${settingsSeoQuery},
    "header": ${settingsHeaderQuery},
    "footer": ${settingsFooterQuery},
  }`
)