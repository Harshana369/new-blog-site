// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'latestArticles',
  title: 'Latest Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Explore our latest articles',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
      initialValue: 'Over 2000+ articles',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      description: 'Drag and drop to reorder. The array order determines display order.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Latest Articles',
        subtitle: 'Singleton — configure latest articles section',
      }
    },
  },
})
