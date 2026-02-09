// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      description: 'Default image for social media sharing when no specific image is set.',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'twitter', title: 'Twitter', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
      ],
    }),
    // Hero Section
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'text',
      rows: 3,
      description: 'Main heading for the hero section. Use <br /> for line breaks.',
    }),
    defineField({
      name: 'heroSubHeading',
      title: 'Hero Sub-Heading',
      type: 'text',
      rows: 2,
      description: 'Sub-heading text below the main heading.',
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Hero Button Text',
      type: 'string',
      initialValue: 'Getting started',
    }),
    defineField({
      name: 'heroButtonUrl',
      title: 'Hero Button URL',
      type: 'string',
      initialValue: '/submit-post',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
      ],
    }),
    defineField({
      name: 'heroUnderlineImage',
      title: 'Hero Underline/Decoration Image',
      type: 'image',
      description: 'The underline decoration image (SVG wavy line)',
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
