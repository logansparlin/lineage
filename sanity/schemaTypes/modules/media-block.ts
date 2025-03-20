export default {
  name: 'mediaBlock',
  title: 'Single Media',
  type: 'object',
  fields: [
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Full Bleed', value: 'full' },
          { title: 'Large', value: 'large' },
          { title: 'Medium', value: 'medium' },
          { title: 'Small', value: 'small' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'full',
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
      type: 'string',
      hidden: ({ parent }) => parent?.size === 'full'
    }
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      image: 'image',
      videoThumbnail: 'videoThumbnail',
      size: 'size',
      caption: 'caption'
    },
    prepare({ mediaType, image, videoThumbnail, size, caption }) {
      return {
        title: `Single ${mediaType === 'image' ? 'Image' : 'Video'} - ${size === 'full' ? 'Full Bleed' : size === 'large' ? 'Large' : size === 'medium' ? 'Medium' : 'Small'}`,
        subtitle: caption,
        media: mediaType === 'image' ? image : videoThumbnail
      }
    }
  }
} 