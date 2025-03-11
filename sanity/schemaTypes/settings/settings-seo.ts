import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "settingsSeo",
  title: "Global SEO",
  type: "document",
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      rows: 2,
      type: 'text'
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'one',
          title: 'Step One',
          type: 'image'
        }),
        defineField({
          name: 'two',
          title: 'Step Two',
          type: 'image'
        }),
        defineField({
          name: 'three',
          title: 'Step Three',
          type: 'image'
        }),
        defineField({
          name: 'four',
          title: 'Step Four',
          type: 'image'
        })
      ]
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image'
    })
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'favicon'
    },
    prepare: ({ title, description, media }) => ({
      title: title || 'Global SEO',
      subtitle: description,
      media: media
    })
  }
});
