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
      name: "title",
      title: "Title",
      type: "string",
    }),
  ],
});
