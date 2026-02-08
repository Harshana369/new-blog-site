import { client } from './client'
import type { QueryParams } from '@sanity/client'

interface SanityFetchOptions {
  query: string
  params?: QueryParams
  tags?: string[]
  revalidate?: number | false
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: SanityFetchOptions): Promise<T> {
  // In development, disable caching to always get fresh data
  const effectiveRevalidate = process.env.NODE_ENV === 'development' ? false : revalidate

  try {
    const result = await client.fetch<T>(query, params, {
      next: {
        revalidate: effectiveRevalidate === false ? false : effectiveRevalidate,
        tags,
      },
    })
    console.log('[sanityFetch] tags:', tags, 'result count:', Array.isArray(result) ? result.length : result ? 1 : 0)
    return result
  } catch (error) {
    console.error('[sanityFetch] ERROR for tags:', tags, error)
    throw error
  }
}
