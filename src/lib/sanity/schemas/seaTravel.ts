// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seaTravel',
  title: 'Sea Travel Enthusiast',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Sea travel enthusiast',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
      initialValue: 'Over 218 articles about sea travel',
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
        title: title || 'Sea Travel Enthusiast',
        subtitle: 'Singleton — configure sea travel section',
      }
    },
  },
})
