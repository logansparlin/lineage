import { defineField } from "sanity"

export default {
  name: 'mediaCarousel',
  title: 'Media Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'media' }]
    })
  ],
  preview: {
    select: {
      items: 'items'
    },
    prepare({ items }) {
      const count = items ? Object.keys(items)?.length : 0

      return {
        title: `Media Carousel`,
        subtitle: `${count} Items`,
      }
    }
  }
} 