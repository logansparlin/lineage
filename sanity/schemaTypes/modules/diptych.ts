export default {
  name: 'diptych',
  title: 'Diptych',
  type: 'object',
  fields: [
    {
      name: 'reversed',
      title: 'Reversed Layout',
      description: 'When reversed, the portrait media will be on the right; otherwise, it will be on the left',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'firstMedia',
      title: 'First Media',
      type: 'object',
      fields: [
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
          initialValue: 'image',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true
          },
          hidden: ({ parent }) => parent?.mediaType !== 'image'
        },
        {
          name: 'video',
          title: 'Video',
          type: 'mux.video',
          hidden: ({ parent }) => parent?.mediaType !== 'video'
        },
        {
          name: 'videoThumbnail',
          title: 'Video Thumbnail',
          type: 'image',
          description: 'Thumbnail to show before video plays',
          options: {
            hotspot: true
          },
          hidden: ({ parent }) => parent?.mediaType !== 'video'
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }
      ]
    },
    {
      name: 'secondMedia',
      title: 'Second Media',
      type: 'object',
      fields: [
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
          initialValue: 'image',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true
          },
          hidden: ({ parent }) => parent?.mediaType !== 'image'
        },
        {
          name: 'video',
          title: 'Video',
          type: 'mux.video',
          hidden: ({ parent }) => parent?.mediaType !== 'video'
        },
        {
          name: 'videoThumbnail',
          title: 'Video Thumbnail',
          type: 'image',
          description: 'Thumbnail to show before video plays',
          options: {
            hotspot: true
          },
          hidden: ({ parent }) => parent?.mediaType !== 'video'
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }
      ]
    }
  ],
  preview: {
    select: {
      firstMediaType: 'firstMedia.mediaType',
      firstImage: 'firstMedia.image',
      firstVideoThumbnail: 'firstMedia.videoThumbnail',
      secondMediaType: 'secondMedia.mediaType',
      reversed: 'reversed'
    },
    prepare({ firstMediaType, firstImage, firstVideoThumbnail, secondMediaType, reversed }) {
      const firstMediaDisplay = firstMediaType === 'image' ? 'Image' : 'Video';
      const secondMediaDisplay = secondMediaType === 'image' ? 'Image' : 'Video';
      
      return {
        title: `Diptych: ${firstMediaDisplay} + ${secondMediaDisplay}`,
        subtitle: reversed ? 'Reversed layout' : 'Standard layout',
        media: firstMediaType === 'image' ? firstImage : firstVideoThumbnail
      }
    }
  }
} 