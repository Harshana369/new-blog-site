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
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'category' }],
              validation: (Rule) => Rule.required(),
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
              title: 'category.name',
              subtitle: 'posts.length',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled tab',
                subtitle: `${subtitle || 0} posts`,
              }
            },
          },
        },
      ],
      description: 'Each tab has a category and its own curated posts. Drag and drop to reorder tabs.',
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
