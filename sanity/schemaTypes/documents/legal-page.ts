import { defineType, defineField } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Legal Pages",
  type: "document",
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
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      options: {
        dateFormat: 'MMMM D, YYYY',
      }
    }),
    defineField({
      name: "content",
      title: "Content",
      type: 'richTextLegal'
    }),
  ],
});
