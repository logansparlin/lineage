import { defineType, defineField } from "sanity";
import { getRelativePath } from "@/lib/get-relative-path";

export default defineType({
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string'
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'reference',
      to: [
        { type: 'homePage' },
        { type: 'caseStudies' },
        { type: 'teamPage' },
        { type: 'legalPage' },
        { type: 'page' },
      ]
    })
  ],
  preview: {
    select: {
      label: 'label',
      slug: 'to.slug.current',
      type: 'to._type',
      hidden: 'to.hidden'
    },
    prepare({ label, slug, type, hidden }) {
      const path = getRelativePath({ type, slug });
      return {
        title: label,
        subtitle: `${path} ${hidden ? '(hidden)' : ''}`
      }
    }
  }
})