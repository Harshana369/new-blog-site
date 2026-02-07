import { sanityFetch } from '@/lib/sanity/fetcher'
import { postSlugsQuery, categorySlugsQuery, tagSlugsQuery, authorSlugsQuery } from '@/lib/sanity/queries'
import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'
const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/reviews`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  if (!isSanityConfigured) return staticRoutes

  try {
    const [postSlugs, categorySlugs, tagSlugs, authorSlugs] = await Promise.all([
      sanityFetch<string[]>({ query: postSlugsQuery, tags: ['posts'], revalidate: 3600 }),
      sanityFetch<string[]>({ query: categorySlugsQuery, tags: ['categories'], revalidate: 3600 }),
      sanityFetch<string[]>({ query: tagSlugsQuery, tags: ['tags'], revalidate: 3600 }),
      sanityFetch<string[]>({ query: authorSlugsQuery, tags: ['authors'], revalidate: 3600 }),
    ])

    const postRoutes: MetadataRoute.Sitemap = (postSlugs || []).map((slug) => ({
      url: `${SITE_URL}/post/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    const categoryRoutes: MetadataRoute.Sitemap = (categorySlugs || []).map((slug) => ({
      url: `${SITE_URL}/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    const tagRoutes: MetadataRoute.Sitemap = (tagSlugs || []).map((slug) => ({
      url: `${SITE_URL}/tag/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    const authorRoutes: MetadataRoute.Sitemap = (authorSlugs || []).map((slug) => ({
      url: `${SITE_URL}/author/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes, ...authorRoutes]
  } catch {
    return staticRoutes
  }
}
