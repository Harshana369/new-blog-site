// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'latestArticlesWithWidgets',
  title: 'Latest Articles with Widgets',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Latest articles',
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
      description: 'Main content posts. Drag and drop to reorder.',
    }),
    defineField({
      name: 'widgetAuthors',
      title: 'Hottest Authors (Widget)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
      description: 'Authors shown in the "Hottest authors" sidebar widget. Drag and drop to reorder.',
    }),
    defineField({
      name: 'widgetCategories',
      title: 'Suggested Categories (Widget)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      description: 'Categories shown in the "Suggested categories" sidebar widget. Drag and drop to reorder.',
    }),
    defineField({
      name: 'widgetPosts',
      title: 'Popular Posts (Widget)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      description: 'Posts shown in the "Popular posts" sidebar widget. Drag and drop to reorder.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Latest Articles with Widgets',
        subtitle: 'Singleton — configure latest articles & sidebar widgets',
      }
    },
  },
})
