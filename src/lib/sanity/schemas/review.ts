// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'object',
  fields: [
    defineField({
      name: 'overallScore',
      title: 'Overall Score (0-10)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(10),
    }),
    defineField({
      name: 'ratings',
      title: 'Category Ratings',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'score',
              title: 'Score (0-10)',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(10).required(),
            }),
          ],
          preview: {
            select: { title: 'category', subtitle: 'score' },
            prepare({ title, subtitle }) {
              return { title, subtitle: `${subtitle}/10` }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'verdict',
      title: 'Verdict',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'awardBadge',
      title: 'Award Badge',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: "Editor's Choice", value: 'editors-choice' },
          { title: 'Best Value', value: 'best-value' },
          { title: 'Best Performance', value: 'best-performance' },
          { title: 'Best Design', value: 'best-design' },
          { title: 'Recommended', value: 'recommended' },
        ],
      },
      initialValue: 'none',
    }),
  ],
})
