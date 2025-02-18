import { defineType, defineField, defineArrayMember } from "sanity";
import { LinkIcon, ArrowTopRightIcon } from '@sanity/icons'

export default defineType({
  name: 'richTextLegal',
  title: 'Rich Text (Legal)',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading', value: 'h2' },
      ],
      marks: {
        decorators: [
          { title: 'Italic', value: 'em' },
          { title: 'Bold', value: 'strong' },
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
    })
  ]
})