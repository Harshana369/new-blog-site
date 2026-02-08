import JsonLd from '@/components/JsonLd'
import WidgetAuthors from '@/components/WidgetAuthors'
import WidgetCategories from '@/components/WidgetCategories'
import WidgetPosts from '@/components/WidgetPosts'
import WidgetTags from '@/components/WidgetTags'
import ProductCard from '@/components/Review/ProductCard'
import { getAuthors } from '@/data/authors'
import { getCategories, getTags } from '@/data/categories'
import { getAllPosts, getCommentsByPostId, getPostByHandle } from '@/data/posts'
import { generateArticleLD, generateBreadcrumbLD, generateReviewLD } from '@/lib/structured-data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SingleContentContainer from '../SingleContentContainer'
import SingleHeaderContainer from '../SingleHeaderContainer'
import SingleRelatedPosts from '../SingleRelatedPosts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const post = await getPostByHandle(handle)
  if (!post) {
    return { title: 'Post not found', description: 'Post not found' }
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/post/${handle}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt || '',
      url: `${SITE_URL}/post/${handle}`,
      images: post.featuredImage?.src ? [{ url: post.featuredImage.src, width: 1200, height: 630, alt: post.title }] : [],
      publishedTime: post.date,
      authors: post.author ? [post.author.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: post.featuredImage?.src ? [post.featuredImage.src] : [],
    },
  }
}

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params
  const post = await getPostByHandle(handle)
  if (!post) {
    notFound()
  }
  const comments = await getCommentsByPostId(post.id)
  const relatedPosts = (await getAllPosts()).slice(0, 6)
  const moreFromAuthorPosts = (await getAllPosts()).slice(1, 7)

  const widgetPosts = (await getAllPosts()).slice(0, 6)
  const widgetCategories = (await getCategories()).slice(0, 6)
  const widgetTags = (await getTags()).slice(0, 6)
  const widgetAuthors = (await getAuthors()).slice(0, 6)

  const articleLD = generateArticleLD(post)
  const reviewLD = post.postType === 'review' ? generateReviewLD(post) : null
  const breadcrumbLD = generateBreadcrumbLD([
    { name: 'Home', url: SITE_URL },
    { name: post.categories?.[0]?.name || 'Articles', url: `${SITE_URL}/category/${post.categories?.[0]?.handle || 'all'}` },
    { name: post.title, url: `${SITE_URL}/post/${handle}` },
  ])

  return (
    <>
      <JsonLd data={articleLD} />
      <JsonLd data={reviewLD} />
      <JsonLd data={breadcrumbLD} />

      <div className="single-post-page">
        <SingleHeaderContainer post={post} />

        <div className="container mt-12 flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
            <SingleContentContainer post={post} comments={comments} />
          </div>
          <div className="mt-12 w-full lg:mt-0 lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0">
            <div className="space-y-7 lg:sticky lg:top-7">
              {post.postType === 'review' && post.product && (
                <ProductCard product={post.product} />
              )}
              <WidgetAuthors authors={widgetAuthors} />
              <WidgetTags tags={widgetTags} />
              <WidgetCategories categories={widgetCategories} />
              <WidgetPosts posts={widgetPosts} />
            </div>
          </div>
        </div>

        <SingleRelatedPosts relatedPosts={relatedPosts} moreFromAuthorPosts={moreFromAuthorPosts} />
      </div>
    </>
  )
}

export default Page
