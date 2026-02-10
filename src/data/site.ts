import { sanityFetch } from '@/lib/sanity/fetcher'
import { siteSettingsQuery, advertisementQuery, newsletterQuery, videosSectionQuery } from '@/lib/sanity/queries'

const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id'

// Static fallback data for when Sanity is not configured
function _getStaticSiteSettings() {
  return {
    title: 'Product Review Site',
    description: 'Expert product reviews with detailed ratings, pros and cons analysis, and buying guides.',
    heroHeading: 'Far from face \\n but not from heart',
    heroSubHeading: "Let stay at home and share with everyone the most beautiful stories in your hometown 🎈",
    heroButtonText: 'Getting started',
    heroButtonUrl: '/submit-post',
    heroImage: null,
    heroUnderlineImage: null,
  }
}

export async function getSiteSettings() {
  if (isSanityConfigured) {
    try {
      const settings = await sanityFetch<any>({
        query: siteSettingsQuery,
        tags: ['siteSettings'],
        revalidate: false, // No caching - always fetch fresh data
      })
      console.log('[getSiteSettings] Fetched settings:', settings)
      return settings || _getStaticSiteSettings()
    } catch (error) {
      console.error('[getSiteSettings] Failed to fetch site settings:', error)
      return _getStaticSiteSettings()
    }
  }
  console.log('[getSiteSettings] Sanity not configured, using static settings')
  return _getStaticSiteSettings()
}

type TSiteSettings = ReturnType<typeof _getStaticSiteSettings>

export { type TSiteSettings }

export type TAdvertisement = {
  label: string
  image: { src: string; alt: string; width: number; height: number } | null
  url: string
}

export async function getAdvertisement(): Promise<TAdvertisement> {
  const fallback: TAdvertisement = {
    label: '- Advertisement -',
    image: null,
    url: '/',
  }

  if (isSanityConfigured) {
    try {
      const result = await sanityFetch<TAdvertisement | null>({
        query: advertisementQuery,
        tags: ['advertisement'],
      })
      if (result) return result
    } catch (error) {
      console.error('[getAdvertisement] Failed to fetch:', error)
    }
  }

  return fallback
}

export type TNewsletter = {
  heading: string
  description: string
  benefits: string[]
  placeholder: string
  image: { src: string; alt: string; width: number; height: number } | null
}

export async function getNewsletter(): Promise<TNewsletter> {
  const fallback: TNewsletter = {
    heading: 'Join our newsletter 🎉',
    description: "Read and share new perspectives on just about any topic. Everyone's welcome.",
    benefits: ['Get more discount', 'Get premium magazines'],
    placeholder: 'Enter your email',
    image: null,
  }

  if (isSanityConfigured) {
    try {
      const result = await sanityFetch<TNewsletter | null>({
        query: newsletterQuery,
        tags: ['newsletter'],
      })
      if (result) return { ...fallback, ...result }
    } catch (error) {
      console.error('[getNewsletter] Failed to fetch:', error)
    }
  }

  return fallback
}

export type TVideoItem = {
  id: string
  title?: string
  thumbnail: string
  video: string
}

export type TVideosSection = {
  heading?: string
  subHeading?: string
  videos?: TVideoItem[]
}

export async function getVideosSection(): Promise<TVideosSection> {
  const fallback: TVideosSection = {}

  if (isSanityConfigured) {
    try {
      const result = await sanityFetch<TVideosSection | null>({
        query: videosSectionQuery,
        tags: ['videosSection'],
      })
      if (result) return result
    } catch (error) {
      console.error('[getVideosSection] Failed to fetch:', error)
    }
  }

  return fallback
}
