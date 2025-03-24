import { defineType, defineField } from "sanity";
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { title: 'Intro', name: 'intro' },
    { title: 'Steps', name: 'steps' },
  ],
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
      name: 'intro',
      title: 'Site Intro',
      type: 'object',
      group: 'intro',
      fields: [
        defineField({
          name: 'titles',
          title: 'Titles',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'text',
                title: 'Text',
                type: 'string',
                description: 'Used for accessible text if SVG is used',
              }),
              defineField({
                name: 'svg',
                title: 'SVG',
                type: 'image',
                description: 'Optional, used for logo text that needs to be precise',
                options: {
                  accept: 'image/svg+xml',
                }
              }),
            ],
            preview: {
              select: {
                type: 'type',
                text: 'text',
                svg: 'svg',
              },
              prepare({ type, text, svg }) {
                return {
                  title: text,
                  subtitle: svg ? 'Type: SVG' : 'Type: Text',
                  media: svg,
                }
              }
            }
          }]
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 8,
        })
      ]
    }),
    defineField({
      name: 'steps',
      title: 'Steps Section',
      type: 'object',
      group: 'steps',
      fields: [
        defineField({
          name: 'intro',
          title: 'Intro',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false,
          },
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
            }),
            defineField({
              name: 'subheading',
              title: 'Subheading',
              type: 'string'
            }),
            defineField({
              name: 'splitDescription',
              title: 'Split Description',
              type: 'object',
              fields: [
                defineField({
                  name: 'headingOne',
                  title: 'Heading One',
                  type: 'string',
                }),
                defineField({
                  name: 'descriptionOne',
                  title: 'Description One',
                  type: 'text',
                  rows: 2
                }),
                defineField({
                  name: 'headingTwo',
                  title: 'Heading Two',
                  type: 'string',
                }),
                defineField({
                  name: 'descriptionTwo',
                  title: 'Description Two',
                  type: 'text',
                  rows: 2
                })
              ]
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'richTextSimple',
            })
          ]
        }),
        defineField({
          name: 'one',
          title: 'Step One',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false,
          },
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            })
          ]
        }),
        defineField({
          name: 'two',
          title: 'Step Two',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false,
          },
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            })
          ]
        }),
        defineField({
          name: 'three',
          title: 'Step Three',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false,
          },
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            })
          ]
        }),
        defineField({
          name: 'four',
          title: 'Step Four',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false,
          },
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            })
          ]
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page'
      }
    }
  }
});
