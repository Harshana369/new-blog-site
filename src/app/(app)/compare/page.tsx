import ComparisonTable from '@/components/Review/ComparisonTable'
import { sanityFetch } from '@/lib/sanity/fetcher'
import { productsBySlugQuery } from '@/lib/sanity/queries'
import type { TProduct } from '@/data/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Products',
  description: 'Compare products side by side with detailed specifications and ratings.',
}

const demoProducts: TProduct[] = [
  {
    id: 'demo-1',
    name: 'Product A',
    slug: 'product-a',
    brand: 'Brand A',
    price: 299,
    currency: 'USD',
    specifications: [
      { label: 'Display', value: '6.1" OLED' },
      { label: 'Battery', value: '4000 mAh' },
      { label: 'Storage', value: '128 GB' },
      { label: 'RAM', value: '8 GB' },
    ],
    reviewScore: 8.5,
  },
  {
    id: 'demo-2',
    name: 'Product B',
    slug: 'product-b',
    brand: 'Brand B',
    price: 399,
    currency: 'USD',
    specifications: [
      { label: 'Display', value: '6.7" AMOLED' },
      { label: 'Battery', value: '5000 mAh' },
      { label: 'Storage', value: '256 GB' },
      { label: 'RAM', value: '12 GB' },
    ],
    reviewScore: 9.0,
  },
]

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ products?: string }>
}) {
  const { products: productSlugs } = await searchParams
  let products: TProduct[] = demoProducts

  if (productSlugs) {
    const slugs = productSlugs.split(',').map((s) => s.trim())
    const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id'

    if (isSanityConfigured && slugs.length > 0) {
      try {
        const sanityProducts = await sanityFetch<TProduct[]>({
          query: productsBySlugQuery,
          params: { slugs },
          tags: ['products'],
        })
        if (sanityProducts?.length) products = sanityProducts
      } catch { /* use demo */ }
    }
  }

  return (
    <div className="container py-16 lg:py-20">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">Compare Products</h1>
        <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400">
          Side-by-side comparison of products with detailed specifications and ratings.
        </p>
      </div>

      <ComparisonTable products={products} />
    </div>
  )
}
