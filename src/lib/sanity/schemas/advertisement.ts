// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'advertisement',
  title: 'Advertisement',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      initialValue: '- Advertisement -',
      description: 'Small text shown above the ad image.',
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
      description: 'The advertisement banner image.',
    }),
    defineField({
      name: 'url',
      title: 'Link URL',
      type: 'url',
      initialValue: '/',
      description: 'The URL to navigate to when the ad is clicked.',
      validation: (Rule) => Rule.uri({ allowRelative: true }),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Advertisement',
        subtitle: 'Singleton — configure advertisement section',
        media,
      }
    },
  },
})
