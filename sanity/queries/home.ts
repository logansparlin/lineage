import { defineQuery, groq } from "next-sanity";
import { imageFields, seoQuery } from "./fragments";

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
      palette,
      step,
      featuredImage {
        ${imageFields}
      },
      shortDescription
    },
    steps {
      intro {
        heading,
        subheading,
        splitDescription {
          headingOne,
          descriptionOne,
          headingTwo,
          descriptionTwo
        },
        description
      },
      one {
        title,
        description
      },
      two {
        title,
        description
      },
      three {
        title,
        description
      },
      four {
        title,
        description
      }
    }
  }`
)