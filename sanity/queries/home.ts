import { defineQuery, groq } from "next-sanity";
import { imageFields, seoQuery, videoFields } from "./fragments";

export const homePageQuery = defineQuery(
  groq`*[_type == "homePage"][0] {
    ${seoQuery},
    title,
    intro {
      titles[] {
        _key,
        text,
        svg {
          ${imageFields}
        }
      },
      description
    },
    "caseStudies": *[_type == "caseStudy"] | order(orderRank) {
      _id,
      title,
      "slug": slug.current,
      palette
    }
  }`
)