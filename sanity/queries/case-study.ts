import { defineQuery, groq } from "next-sanity";
import { seoQuery, modulesFields, imageFields } from "./fragments";

export const caseStudyPathsQuery = defineQuery(
  groq`*[_type == "caseStudy"] {
    "slug": slug.current
  }`
)

export const caseStudyQuery = defineQuery(
  groq`*[_type == "caseStudy" && slug.current == $slug][0] {
    ${seoQuery},
    title,
    step,
    "slug": slug.current,
    featuredImage,
    shortDescription,
    description,
    content[] {
      ${modulesFields}
    },
    "all": *[_type == "caseStudy"] | order(orderRank asc) {
      title,
      "slug": slug.current
    },
    "next": *[_type == "caseStudy" && orderRank > ^.orderRank] | order(orderRank asc) {
      "slug": slug.current,
      title,
      description,
      step,
      featuredImage {
        ${imageFields}
      }
    }[0]
  }`
)