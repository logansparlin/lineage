import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "settingsHeader",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'column',
          title: 'Column',
          type: 'object',
          fields: [
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'internalLink',
                  title: 'Internal Link',
                  type: 'internalLink'
                }),
                defineArrayMember({
                  name: 'externalLink',
                  title: 'External Link',
                  type: 'externalLink'
                }),
                defineArrayMember({
                  name: 'textBlock',
                  title: 'Text',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Text',
                      type: 'string'
                    })
                  ]
                })
              ]
            })
          ],
          preview: {
            select: {},
            prepare: () => ({
              title: 'Menu Column'
            })
          }
        })
      ],
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Header'
    })
  }
});
