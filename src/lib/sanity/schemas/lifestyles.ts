// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lifestyles',
  title: 'Life Styles',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Life styles 🎨 ',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Tab Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      description: 'Drag and drop to reorder. These appear as filter tabs above the posts.',
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
        title: title || 'Life Styles',
        subtitle: 'Singleton — configure life styles section',
      }
    },
  },
})
