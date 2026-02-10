// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'topAuthors',
  title: 'Top Authors of Month',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Top authors of month',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
      initialValue: 'Say hello to future creator potentials',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
      description: 'Drag and drop to reorder. The array order determines display order.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Top Authors of Month',
        subtitle: 'Singleton — configure top authors section',
      }
    },
  },
})
