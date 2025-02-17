import { defineType, defineField, defineArrayMember } from "sanity";
import { LinkIcon, ArrowTopRightIcon } from '@sanity/icons'

export default defineType({
  name: 'richTextSimple',
  title: 'Rich Text (Simple)',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
      ],
      marks: {
        decorators: [
          { title: 'Italic', value: 'em' },
          { title: 'Year', value: 'year', icon: () => 'y', component: () => <>{new Date().getFullYear()}</> }
        ],
        annotations: [
          defineField({
            name: 'internalLink',
            title: 'Internal Link',
            type: 'object',
            fields: [
              defineField({
                name: 'to',
                title: 'To',
                type: 'reference',
                to: [
                  { type: 'homePage' },
                ]
              }),
              defineField({
                name: 'arrow',
                title: 'With Arrow',
                type: 'boolean',
                initialValue: false
              })
            ],
            icon: () => <LinkIcon />
          }),
          defineField({
            title: 'External Link',
            name: 'externalLink',
            type: 'object',
            fields: [
              defineField({
                name: 'url',
                title: 'URL',
                type: 'url',
                validation: (Rule) => Rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel']
                })
              }),
            ],
            icon: () => <ArrowTopRightIcon />
          })
        ]
      },
      lists: []
    })
  ]
})