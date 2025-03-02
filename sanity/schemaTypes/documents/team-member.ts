import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "teamMember",
  title: "Team Members",
  type: "document",
  orderings: [
    orderRankOrdering
  ],
  fields: [
    orderRankField({ type: 'teamMember' }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'richTextSimple',
    }),
  ],
});
