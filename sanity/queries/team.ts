import { defineQuery, groq } from "next-sanity";
import { imageFields, seoQuery } from "./fragments";

export const teamPageQuery = defineQuery(
  groq`*[_type == "teamPage"][0] {
    ${seoQuery},
    title,
    "members": *[_type == "teamMember"] | order(orderRank) {
      _id,
      name,
      "slug": slug.current,
      role,
      image {
        ${imageFields}
      },
      bio
    }
  }`
)