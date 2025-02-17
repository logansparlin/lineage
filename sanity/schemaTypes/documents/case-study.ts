import { defineType, defineField } from "sanity";
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO Meta',
      type: 'seo'
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
