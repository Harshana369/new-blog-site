// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Join our newsletter 🎉',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue: "Read and share new perspectives on just about any topic. Everyone's welcome.",
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of benefits shown as numbered badges. Drag and drop to reorder.',
    }),
    defineField({
      name: 'placeholder',
      title: 'Input Placeholder',
      type: 'string',
      initialValue: 'Enter your email',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      description: 'The illustration shown next to the newsletter form.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Newsletter',
        subtitle: 'Singleton — configure newsletter section',
        media,
      }
    },
  },
})
