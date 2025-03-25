export default {
  name: 'triptych',
  title: 'Triptych',
  type: 'object',
  fields: [
    {
      name: 'reversed',
      title: 'Reversed Layout',
      description: 'By default the two columns are on the left and the large media is on the right. If reversed is checked, the two columns will be on the right and the large media will be on the left.',
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
    },
    {
      name: 'thirdmedia',
      title: 'Third Media',
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
      firstVideo: 'firstMedia.video.asset.playbackId',
      secondMediaType: 'secondMedia.mediaType',
      thirdMediaType: 'thirdMedia.mediaType',
      reversed: 'reversed'
    },
    prepare({ firstMediaType, firstImage, firstVideo, secondMediaType, thirdMediaType, reversed }) {
      const firstMediaDisplay = firstMediaType === 'image' ? 'Image' : 'Video';
      const secondMediaDisplay = secondMediaType === 'image' ? 'Image' : 'Video';
      const thirdMediaDisplay = thirdMediaType === 'image' ? 'Image' : 'Video';
      
      return {
        title: `Triptych: ${firstMediaDisplay} + ${secondMediaDisplay} + ${thirdMediaDisplay}`,
        subtitle: reversed ? 'Reversed layout' : 'Standard layout',
        media: firstMediaType === 'image' ? firstImage : firstVideo ? (
          <img src={`https://image.mux.com/${firstVideo}/thumbnail.png?time=1`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null
      }
    }
  }
} 