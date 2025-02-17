import { defineQuery, groq } from "next-sanity";
import { mediaFields, videoFields, imageFields, seoQuery } from "./fragments";

export const caseStudyPathsQuery = defineQuery(
  groq`*[_type == "caseStudy"] {
    "slug": slug.current
  }`
)

export const caseStudyQuery = defineQuery(
  groq`*[_type == "caseStudy" && slug.current == $slug][0] {
    ${seoQuery},
    title,
  }`
)