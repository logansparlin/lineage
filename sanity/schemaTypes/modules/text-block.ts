export default {
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'richText',
      validation: Rule => Rule.required()
    },
    {
      name: 'hasSecondColumn',
      title: 'Add Second Column',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'secondColumnText',
      title: 'Second Column Text',
      type: 'richText',
      hidden: ({ parent }) => !parent?.hasSecondColumn
    }
  ],
  preview: {
    select: {
      headline: 'headline',
      text: 'text',
      hasSecondColumn: 'hasSecondColumn',
    },
    prepare({ headline, text, hasSecondColumn }) {
      const textString = text && text[0]?.children?.map(child => child.text).join('').slice(0, 50) + '...'
      return {
        title: headline || textString,
        subtitle: `${hasSecondColumn ? 2 : 1} Column Text${headline ? ' – With Headline' : ''}`
      }
    }
  }
} 