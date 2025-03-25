import { defineField } from "sanity"

export default {
  name: 'mediaGrid',
  title: 'Media Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      description: 'Creates either a 2 column, 3 column, or 3 column by 2 row layout',
      of: [{ type: 'media' }],
      validation: Rule => Rule.max(6)
    })
  ],
  preview: {
    select: {
      items: 'items',
      firstItemMediaType: 'items.0.mediaType',
      firstItemImage: 'items.0.image',
      firstItemVideo: 'items.0.video.asset.playbackId',
    },
    prepare({ items, firstItemMediaType, firstItemImage, firstItemVideo }) {
      const count = items ? Object.keys(items)?.length : 0

      const layoutMap = {
        2: '2 Columns',
        3: '3 Columns',
        6: '3 Columns, 2 Rows'
      }

      return {
        title: `Media Grid - ${layoutMap[count]}`,
        subtitle: `${count} Items`,
        media: firstItemMediaType === 'image' ? firstItemImage : firstItemVideo ? (
          <img src={`https://image.mux.com/${firstItemVideo}/thumbnail.png?time=1`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null
      }
    }
  }
} 