import { defineType, defineField } from "sanity";

export default defineType({
  name: "caseStudies",
  title: "Case Studies",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: 'Case Studies',
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    })
  ],
});
