export default {
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
    },
    {
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Extra Small', value: 'xs' },
          { title: 'Small', value: 's' },
          { title: 'Medium', value: 'm' },
          { title: 'Large', value: 'l' }
        ],
      },
      initialValue: 'm',
    },
    {
      name: 'image',
      title: 'Image Background',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      text: 'text',
      attribution: 'attribution',
      size: 'size',
      image: 'image'
    },
    prepare({ text, size, image, attribution }) {
      const sizeMap = {
        xs: 'Extra Small',
        s: 'Small',
        m: 'Medium',
        l: 'Large'
      }
      return {
        title: `${text.slice(0, 50)}...`,
        subtitle: `Quote — size: ${sizeMap[size]}${attribution ? `, attribution: ${attribution}` : ''}${image ? ' with Image Background' : ''}`,
        media: image
      }
    }
  }
} 