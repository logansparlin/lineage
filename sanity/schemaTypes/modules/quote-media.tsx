export default {
  name: 'quoteMedia',
  title: 'Quote + Media',
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
      name: 'mediaPosition',
      title: 'Media Position',
      description: 'When reversed, the portrait media will be on the right; otherwise, it will be on the left',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' }
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right'
    },
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent?.mediaType !== 'image'
    },
    {
      name: 'video',
      title: 'Video',
      type: 'mux.video',
      hidden: ({ parent }) => parent?.mediaType !== 'video'
    }
  ],
  preview: {
    select: {
      text: 'text',
      attribution: 'attribution',
      mediaPosition: 'mediaPosition',
      mediaType: 'mediaType',
      image: 'image',
      playbackId: 'video.asset.playbackId',
    },
    prepare({ text, attribution, mediaPosition, mediaType, image, playbackId }) {
      
      return {
        title: `${text.slice(0, 50)}...${attribution ? `, ${attribution}` : ''}`,
        subtitle: `Quote with ${mediaType === 'image' ? 'Image' : 'Video'} – ${mediaPosition === 'left' ? 'Media on Left' : 'Media on Right'}`,
        media: mediaType === 'image' ? image : playbackId ? (
          <img src={`https://image.mux.com/${playbackId}/thumbnail.png?time=1`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null
      }
    }
  }
} 