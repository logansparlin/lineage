import { defineQuery, groq } from "next-sanity";
import { linkFields, imageFields } from "./fragments";

export const settingsHeaderQuery = defineQuery(
  groq`*[_type == "settingsHeader"][0] {
    columns[] {
      _key,
      links[] {
        _key,
        _type,
        _type == "internalLink" => {
          label,
          "to": to->{
            _type,
            "slug": slug.current
          }
        },
        _type == "externalLink" => {
          label,
          url
        },
        _type == "textBlock" => {
          text
        }
      }
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
  }`
)