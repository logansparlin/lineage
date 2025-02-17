import { defineType, defineField } from "sanity";

export default defineType({
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string'
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'reference',
      to: [
        { type: 'homePage' },
      ]
    })
  ]
})