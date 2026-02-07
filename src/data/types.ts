export interface CustomLink {
  label: string
  href: string
  targetBlank?: boolean
}

export interface TReviewRating {
  category: string
  score: number
}

export interface TReviewData {
  overallScore: number
  ratings: TReviewRating[]
  pros: string[]
  cons: string[]
  verdict: string
  awardBadge?: 'none' | 'editors-choice' | 'best-value' | 'best-performance' | 'best-design' | 'recommended'
}

export interface TAffiliateLink {
  store: string
  url: string
  price?: string
  isPrimary?: boolean
}

export interface TProductSpec {
  label: string
  value: string
}

export interface TProduct {
  id: string
  name: string
  slug: string
  brand?: string
  description?: string
  price?: number
  currency?: string
  images?: { src: string; alt: string; width: number; height: number }[]
  specifications?: TProductSpec[]
  affiliateLinks?: TAffiliateLink[]
  category?: string
  reviewScore?: number
}
