import { defineType, defineField } from "sanity";
import { lineageSteps } from "../../lib/lineage-steps";
import { orderRankOrdering, orderRankField } from "@sanity/orderable-document-list";

import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  icon: HomeIcon,
  orderings: [orderRankOrdering],
  groups: [
    { title: 'SEO', name: 'seo' },
    { title: 'Overview', name: 'overview' },
  ],
  fields: [
    orderRankField({ type: 'caseStudy' }),
    defineField({
      name: 'seo',
      title: 'SEO Meta',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: 'overview',
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: 'overview',
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "step",
      title: "Step",
      type: "string",
      options: { list: lineageSteps },
      group: 'overview',
    }),
    defineField({
      name: 'featuredMediaType',
      title: 'Featured Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
      group: 'overview',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'overview',
      hidden: ({ parent }) => parent?.featuredMediaType === 'video',
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Featured Video',
      type: 'mux.video',
      group: 'overview',
      hidden: ({ parent }) => parent?.featuredMediaType === 'image',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      description: 'The short description to be shown on the case study grid items',
      type: 'text',
      group: 'overview',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'The full description to be shown on the case study page',
      type: 'text',
      group: 'overview',
      rows: 5,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'quote' },
        { type: 'quoteMedia' },
        { type: 'mediaBlock' },
        { type: 'textBlock' },
        { type: 'diptych' },
        { type: 'triptych' },
        { type: 'offsetMedia' },
        { type: 'mediaCarousel' },
        { type: 'mediaGrid' },
      ]
    })
  ],
});
