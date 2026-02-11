// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'Site logo',
        }),
      ],
      description: 'Upload a custom logo for the footer. If empty, the default SVG logo is used.',
    }),
    defineField({
      name: 'menus',
      title: 'Menu Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'URL',
                      type: 'string',
                      initialValue: '/',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                },
              ],
              description: 'Drag and drop to reorder links.',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'links.length' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled column',
                subtitle: `${subtitle || 0} links`,
              }
            },
          },
        },
      ],
      description: 'Footer menu columns. Drag and drop to reorder columns.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'href' },
          },
        },
      ],
      description: 'Social media links shown next to the logo.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
        subtitle: 'Singleton — configure footer menus & social links',
      }
    },
  },
})
