const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'

export function generateOrganizationLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Product Review Site',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
  }
}

export function generateWebSiteLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Product Review Site',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateArticleLD(post: {
  title: string
  excerpt?: string
  date?: string
  handle: string
  featuredImage?: { src: string }
  author?: { name: string; handle: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.featuredImage?.src || '',
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE_URL}/post/${post.handle}`,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Unknown',
      url: post.author ? `${SITE_URL}/author/${post.author.handle}` : SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Product Review Site',
      url: SITE_URL,
    },
  }
}

export function generateReviewLD(post: {
  title: string
  handle: string
  date?: string
  author?: { name: string }
  reviewData?: {
    overallScore: number
    verdict?: string
  }
  product?: {
    name: string
    brand?: string
    price?: number
    currency?: string
    images?: { src: string }[]
  }
}) {
  if (!post.reviewData || !post.product) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: post.title,
    url: `${SITE_URL}/post/${post.handle}`,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Unknown',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: post.reviewData.overallScore,
      bestRating: 10,
      worstRating: 0,
    },
    reviewBody: post.reviewData.verdict || '',
    itemReviewed: {
      '@type': 'Product',
      name: post.product.name,
      brand: post.product.brand
        ? { '@type': 'Brand', name: post.product.brand }
        : undefined,
      image: post.product.images?.[0]?.src || '',
      offers: post.product.price
        ? {
            '@type': 'Offer',
            price: post.product.price,
            priceCurrency: post.product.currency || 'USD',
          }
        : undefined,
    },
  }
}

export function generateProductLD(product: {
  name: string
  brand?: string
  description?: string
  price?: number
  currency?: string
  images?: { src: string }[]
  reviewScore?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || '',
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    image: product.images?.map((img) => img.src) || [],
    offers: product.price
      ? {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency || 'USD',
          availability: 'https://schema.org/InStock',
        }
      : undefined,
    aggregateRating: product.reviewScore
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.reviewScore,
          bestRating: 10,
          ratingCount: 1,
        }
      : undefined,
  }
}

export function generateBreadcrumbLD(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
