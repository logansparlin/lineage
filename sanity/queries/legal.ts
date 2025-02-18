import { defineQuery, groq } from "next-sanity";
import { mediaFields, videoFields, imageFields, seoQuery } from "./fragments";

export const legalPagePathsQuery = defineQuery(
  groq`*[_type == "legalPage"] {
    "slug": slug.current
  }`
)

export const legalPageQuery = defineQuery(
  groq`*[_type == "legalPage" && slug.current == $slug][0] {
    ${seoQuery},
    lastUpdated,
    title,
    content
  }`
)