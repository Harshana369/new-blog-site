import { sanityFetch } from '@/lib/sanity/fetcher'
import { siteSettingsQuery } from '@/lib/sanity/queries'

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
