import { defineQuery, groq } from "next-sanity";
import { seoQuery } from "./fragments";

export const pagePathsQuery = defineQuery(
  groq`*[_type == "page"] {
    "slug": slug.current
  }`
)

export const pageQuery = defineQuery(
  groq`*[_type == "page" && slug.current == $slug][0] {
    ${seoQuery},
    lastUpdated,
    title,
    content[] {
      ...,
      _type == "expandableList" => {
        title,
        color,
        items
      }
    }
  }`
)