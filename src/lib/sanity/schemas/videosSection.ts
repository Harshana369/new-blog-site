// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videosSection',
  title: 'Videos Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube video URL (e.g. https://www.youtube.com/watch?v=...)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'thumbnail',
              title: 'Thumbnail',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
              description: 'Custom thumbnail image. If not provided, a default placeholder will be used.',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'videoUrl',
              media: 'thumbnail',
            },
          },
        },
      ],
      description: 'Drag and drop to reorder. The first video is shown as the main (large) player.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Videos Section',
        subtitle: 'Singleton — configure videos section',
      }
    },
  },
})
