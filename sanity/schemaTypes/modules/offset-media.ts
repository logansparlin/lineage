export default {
  name: 'offsetMedia',
  title: 'Offset Media',
  type: 'object',
  fields: [
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
          name: 'controls',
          title: 'With Controls?',
          type: 'boolean',
          description: 'If false, the video will autoplay and loop without controls',
          initialValue: true,
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
          name: 'text',
          title: 'Text',
          type: 'richText'
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
          name: 'text',
          title: 'Text',
          type: 'richText'
        }
      ]
    }
  ],
  preview: {
    select: {
      firstMediaType: 'firstMedia.mediaType',
      firstImage: 'firstMedia.image',
      firstVideoThumbnail: 'firstMedia.videoThumbnail',
      secondMediaType: 'secondMedia.mediaType'
    },
    prepare({ firstMediaType, firstImage, firstVideoThumbnail, secondMediaType }) {
      const firstMediaDisplay = firstMediaType === 'image' ? 'Image' : 'Video';
      const secondMediaDisplay = secondMediaType === 'image' ? 'Image' : 'Video';
      
      return {
        title: `Offset Media: ${firstMediaDisplay} + ${secondMediaDisplay}`,
        subtitle: 'Offset Media Layout',
        media: firstMediaType === 'image' ? firstImage : firstVideoThumbnail
      }
    }
  }
} 