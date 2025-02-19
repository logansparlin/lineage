import { defineType, defineField, defineArrayMember } from "sanity";
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { title: 'Intro', name: 'intro' },
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
