import { defineType } from "sanity";

export default defineType({
  name: 'media',
  title: 'Media',
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
      type: 'string',
      hidden: ({ parent }) => parent?.size === 'full'
    },
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      image: 'image',
      videoThumbnail: 'videoThumbnail',
      playbackId: 'video.playbackId',
      caption: 'caption'
    },
    prepare({ mediaType, image, videoThumbnail, caption, playbackId }) {
      return {
        title: mediaType === 'image' ? 'Image' : 'Video',
        subtitle: caption,
        media: mediaType === 'image' ? image : videoThumbnail ? videoThumbnail : playbackId ? (
          <img src={`https://image.mux.com/${playbackId}/thumbnail.png?time=1`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null
      }
    }
  }
})