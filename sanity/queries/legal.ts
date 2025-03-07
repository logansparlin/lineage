import { defineQuery, groq } from "next-sanity";
import { seoQuery } from "./fragments";

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