import JsonLd from '@/components/JsonLd'
import { getAllPosts, getCommentsByPostId, getPostByHandle } from '@/data/posts'
import { generateArticleLD, generateBreadcrumbLD, generateReviewLD } from '@/lib/structured-data'
import { Metadata } from 'next'
import SingleContentContainer from '../../SingleContentContainer'
import SingleHeaderContainer from '../../SingleHeaderContainer'
import SingleRelatedPosts from '../../SingleRelatedPosts'

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
    alternates: { canonical: `${SITE_URL}/post/page-style-3/${handle}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt || '',
      url: `${SITE_URL}/post/page-style-3/${handle}`,
      images: post.featuredImage?.src ? [{ url: post.featuredImage.src, width: 1200, height: 630, alt: post.title }] : [],
      publishedTime: post.date,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt || '' },
  }
}

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params
  const post = await getPostByHandle(handle)
  const comments = await getCommentsByPostId(post.id)
  const relatedPosts = (await getAllPosts()).slice(0, 6)
  const moreFromAuthorPosts = (await getAllPosts()).slice(1, 7)

  return (
    <>
      <JsonLd data={generateArticleLD(post)} />
      <JsonLd data={post.postType === 'review' ? generateReviewLD(post) : null} />
      <JsonLd data={generateBreadcrumbLD([
        { name: 'Home', url: SITE_URL },
        { name: post.title, url: `${SITE_URL}/post/page-style-3/${handle}` },
      ])} />

      <div className="single-post-page page-style-3">
        <SingleHeaderContainer post={post} headerStyle="style3" />
        <div className="container mt-12">
          <SingleContentContainer post={post} comments={comments} />
        </div>
        <SingleRelatedPosts relatedPosts={relatedPosts} moreFromAuthorPosts={moreFromAuthorPosts} />
      </div>
    </>
  )
}

export default Page
