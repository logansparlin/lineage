import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamPage",
  title: "Team Page",
  type: "document",
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO Meta',
      type: 'seo'
    }),
    defineField({
      name: 'hidden',
      title: 'Hidden',
      type: 'boolean',
      description: 'If true, the team page will not be accessible on the site.',
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
  ],
});
