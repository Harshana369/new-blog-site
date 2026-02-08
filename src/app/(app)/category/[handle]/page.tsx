import ArchiveSortByListBox from '@/components/ArchiveSortByListBox'
import JsonLd from '@/components/JsonLd'
import ModalCategories from '@/components/ModalCategories'
import ModalTags from '@/components/ModalTags'
import PaginationWrapper from '@/components/PaginationWrapper'
import Card11 from '@/components/PostCards/Card11'
import { getCategories, getCategoryByHandle, getTags } from '@/data/categories'
import type { TPost } from '@/data/posts'
import { generateBreadcrumbLD } from '@/lib/structured-data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '../page-header'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const category = await getCategoryByHandle(handle)

  if (!category) {
    return { title: 'Category not found', description: 'Category not found' }
  }

  return {
    title: category?.name,
    description: category?.description,
    alternates: { canonical: `${SITE_URL}/category/${handle}` },
    openGraph: {
      title: category?.name,
      description: category?.description || '',
      url: `${SITE_URL}/category/${handle}`,
      images: category?.thumbnail?.src ? [{ url: category.thumbnail.src, width: 1200, height: 630, alt: category.name }] : [],
    },
  }
}

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params
  const category = await getCategoryByHandle(handle)

  if (!category) {
    return notFound()
  }

  const posts = category.posts || []
  const categories = await getCategories()
  const tags = await getTags()

  const filterOptions = [
    { name: 'Most recent', value: 'most-recent' },
    { name: 'Curated by admin', value: 'curated-by-admin' },
    { name: 'Most appreciated', value: 'most-appreciated' },
    { name: 'Most discussed', value: 'most-discussed' },
    { name: 'Most viewed', value: 'most-viewed' },
  ]

  return (
    <div className={`page-category-${handle}`}>
      <JsonLd data={generateBreadcrumbLD([
        { name: 'Home', url: SITE_URL },
        { name: category.name, url: `${SITE_URL}/category/${handle}` },
      ])} />
      <PageHeader category={category} />

      <div className="container pt-10 lg:pt-20">
        <div className="flex flex-wrap gap-x-2 gap-y-4">
          <ModalCategories categories={categories} />
          <ModalTags tags={tags} />
          <div className="ms-auto">
            <ArchiveSortByListBox filterOptions={filterOptions} />
          </div>
        </div>

        {/* LOOP ITEMS */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post: TPost) => (
            <Card11 key={post.id} post={post} />
          ))}
        </div>

        {/* PAGINATIONS */}
        <PaginationWrapper className="mt-20" />
      </div>
    </div>
  )
}

export default Page
