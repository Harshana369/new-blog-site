import Card11 from '@/components/PostCards/Card11'
import { getAllPosts, TPost } from '@/data/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Reviews',
  description: 'In-depth product reviews with ratings, pros and cons, and expert verdicts.',
}

export default async function ReviewsPage() {
  const allPosts = await getAllPosts()
  const reviewPosts = allPosts.filter((post: TPost) => post.postType === 'review')
  // If no review posts yet, show standard posts as placeholder
  const posts: TPost[] = reviewPosts.length > 0 ? reviewPosts : allPosts.slice(0, 12)

  return (
    <div className="container py-16 lg:py-20">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">Product Reviews</h1>
        <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400">
          In-depth reviews with detailed ratings, pros and cons analysis, and expert verdicts to help you make informed
          purchasing decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <Card11 key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
