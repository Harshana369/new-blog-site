// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'trendingTopics',
  title: 'Trending Topics',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Top trending topics',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
      initialValue: 'Discover over 112 topics',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
      description: 'Drag and drop to reorder. The array order determines display order.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Trending Topics',
        subtitle: 'Singleton — configure trending categories',
      }
    },
  },
})
