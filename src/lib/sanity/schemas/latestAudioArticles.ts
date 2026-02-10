// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'latestAudioArticles',
  title: 'Latest Audio Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Latest audio articles',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
      initialValue: 'Over 1000+ audio articles',
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
        title: title || 'Latest Audio Articles',
        subtitle: 'Singleton — configure latest audio articles section',
      }
    },
  },
})
