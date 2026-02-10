import { sanityFetch } from '@/lib/sanity/fetcher'
import { categoriesQuery, categoryByHandleQuery, trendingTopicsQuery, latestArticlesQuery, latestAudioArticlesQuery, lifestylesQuery, seaTravelQuery, tagsQuery, tagByHandleQuery } from '@/lib/sanity/queries'
import { getAllPosts, getPostsDefault, getPostsAudio, TPost } from './posts'

const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id'

const _demo_category_image_urls = [
  'https://images.unsplash.com/photo-1539477857993-860599c2e840?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1636306950045-4dbb10b7e0f4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1679913969285-64f089885005?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1680792563719-288027b2a090?q=80&w=2693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1679403855896-49b0bd34744a?q=80&w=2693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1533090368676-1fd25485db88?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1660254149750-f31f1c59a86b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1462611290231-f44865b5750c?q=80&w=2271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

function _makeCategory(id: string, name: string, handle: string, description: string, color: string, count: number, date: string, imgIdx: number) {
  return { id, name, handle, description, color, count, date, thumbnail: { src: _demo_category_image_urls[imgIdx % 10], alt: name, width: 1920, height: 1080 } }
}

function _getStaticCategories() {
  return [
    _makeCategory('category-1', 'Garden', 'garden', 'Explore the world of gardening, from planting to harvesting and everything in between.', 'indigo', 13, '2025-06-10', 0),
    _makeCategory('category-2', 'Technology', 'technology', 'Stay updated with the latest technology news, trends, and innovations.', 'blue', 25, '2025-05-15', 1),
    _makeCategory('category-3', 'Fitness', 'fitness', 'Discover workout routines, health tips, and wellness advice for a better lifestyle.', 'red', 18, '2025-04-20', 2),
    _makeCategory('category-4', 'Finance', 'finance', 'Stay updated with financial news, investment strategies, and money management tips.', 'green', 22, '2025-03-05', 3),
    _makeCategory('category-5', 'Travel', 'travel', 'Explore travel guides, destination reviews, and adventure stories from around the world.', 'yellow', 30, '2025-02-15', 4),
    _makeCategory('category-6', 'Photography', 'photography', 'Discover the art of photography, from landscape shots to portrait techniques and editing tips.', 'purple', 28, '2025-01-20', 5),
    _makeCategory('category-7', 'Music', 'music', 'Explore music reviews, artist interviews, and the latest trends in the music industry.', 'pink', 35, '2025-01-15', 6),
    _makeCategory('category-8', 'Architecture', 'architecture', 'Discover architectural marvels, design trends, and insights into the world of building and construction.', 'gray', 22, '2025-01-10', 7),
    _makeCategory('category-9', 'Wellness', 'wellness', 'Find tips and advice for mental and physical wellness, including meditation, yoga, and healthy living.', 'teal', 27, '2025-01-05', 8),
    _makeCategory('category-10', 'Education', 'education', 'Stay informed about educational trends, learning resources, and academic insights.', 'orange', 31, '2025-01-01', 9),
    _makeCategory('category-11', 'Typography', 'typography', 'Stay informed about educational trends, learning resources, and academic insights.', 'sky', 31, '2025-06-15', 1),
  ]
}

export type TTrendingTopics = {
  heading: string
  subHeading: string
  categories: TCategory[]
}

export async function getTrendingTopics(): Promise<TTrendingTopics> {
  const fallback: TTrendingTopics = {
    heading: 'Top trending topics',
    subHeading: 'Discover over 112 topics',
    categories: [],
  }

  if (isSanityConfigured) {
    try {
      const result = await sanityFetch<TTrendingTopics | null>({
        query: trendingTopicsQuery,
        tags: ['trendingTopics'],
      })
      if (result?.categories?.length) return result
    } catch (error) {
      console.error('[getTrendingTopics] Failed to fetch:', error)
    }
  }

  // Fallback: use first 10 categories
  const categories = await getCategories()
  return {
    ...fallback,
    categories: categories.slice(0, 10),
  }
}

export type TLatestArticles = {
  heading: string
  subHeading: string
  posts?: TPost[]
}

export async function getLatestArticlesSection(): Promise<TLatestArticles> {
  const fallback: TLatestArticles = {
    heading: 'Explore our latest articles',
    subHeading: 'Over 2000+ articles',
  }

  if (isSanityConfigured) {
    try {
      const result = await sanityFetch<TLatestArticles | null>({
        query: latestArticlesQuery,
        tags: ['latestArticles'],
      })
      if (result?.heading) {
        // If no posts selected in Studio, fall back to recent posts
        if (!result.posts?.length) {
          const allPosts = await getAllPosts()
          result.posts = allPosts.slice(0, 8)
        }
        return result
      }
    } catch (error) {
      console.error('[getLatestArticlesSection] Failed to fetch:', error)
    }
  }

  return fallback
}

export type TLatestAudioArticles = {
  heading: string
  subHeading: string
  posts?: TPost[]
}

export async function getLatestAudioArticlesSection(): Promise<TLatestAudioArticles> {
  const fallback: TLatestAudioArticles = {
    heading: 'Latest audio articles',
    subHeading: 'Over 1000+ audio articles',
  }

  if (isSanityConfigured) {
    try {
      const result = await sanityFetch<TLatestAudioArticles | null>({
        query: latestAudioArticlesQuery,
        tags: ['latestAudioArticles'],
      })
      if (result?.heading) {
        if (!result.posts?.length) {
          const audioPosts = await getPostsAudio()
          result.posts = audioPosts.slice(0, 9)
        }
        return result
      }
    } catch (error) {
      console.error('[getLatestAudioArticlesSection] Failed to fetch:', error)
    }
  }

  return fallback
}

export type TLifestyleTab = {
  category: { id: string; name: string }
  posts: TPost[]
}

export type TLifestyles = {
  heading: string
  subHeading?: string
  tabs?: TLifestyleTab[]
}

export async function getLifestylesSection(): Promise<TLifestyles> {
  const fallback: TLifestyles = {
    heading: 'Life styles 🎨 ',
  }

  if (isSanityConfigured) {
    try {
      const result = await sanityFetch<TLifestyles | null>({
        query: lifestylesQuery,
        tags: ['lifestyles'],
      })
      if (result?.heading) {
        // For tabs without posts, fall back to recent posts
        if (result.tabs?.length) {
          const allPosts = await getAllPosts()
          result.tabs = result.tabs.map(tab => ({
            ...tab,
            posts: tab.posts?.length ? tab.posts : allPosts.slice(0, 8),
          }))
        }
        return result
      }
    } catch (error) {
      console.error('[getLifestylesSection] Failed to fetch:', error)
    }
  }

  return fallback
}

export type TSeaTravel = {
  heading: string
  subHeading: string
  posts?: TPost[]
}

export async function getSeaTravelSection(): Promise<TSeaTravel> {
  const fallback: TSeaTravel = {
    heading: 'Sea travel enthusiast',
    subHeading: 'Over 218 articles about sea travel',
  }

  if (isSanityConfigured) {
    try {
      const result = await sanityFetch<TSeaTravel | null>({
        query: seaTravelQuery,
        tags: ['seaTravel'],
      })
      if (result?.heading) {
        if (!result.posts?.length) {
          const allPosts = await getAllPosts()
          result.posts = allPosts.slice(0, 8)
        }
        return result
      }
    } catch (error) {
      console.error('[getSeaTravelSection] Failed to fetch:', error)
    }
  }

  return fallback
}

export async function getCategories() {
  if (isSanityConfigured) {
    try {
      const categories = await sanityFetch<TCategory[]>({ query: categoriesQuery, tags: ['categories'] })
      return categories || []
    } catch (error) {
      console.error('[getCategories] Failed to fetch categories:', error)
      return []
    }
  }
  return _getStaticCategories()
}

export async function getCategoryByHandle(handle: string) {
  handle = handle?.toLowerCase()
  const posts = (await getAllPosts()).slice(0, 12)

  if (handle === 'all') {
    return {
      id: 'category-all',
      name: 'All articles',
      handle: 'all',
      description: 'Explore all articles',
      count: 2500,
      date: '2025-01-01',
      thumbnail: {
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'All',
        width: 1920,
        height: 1080,
      },
      cover: {
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'All',
        width: 1920,
        height: 1080,
      },
      color: 'indigo',
      posts,
    }
  }

  if (isSanityConfigured) {
    try {
      const category = await sanityFetch<TCategory | null>({
        query: categoryByHandleQuery,
        params: { handle },
        tags: ['categories'],
      })
      if (category) return { ...category, posts }
      return null
    } catch {
      return null
    }
  }

  const categories = await getCategories()
  let category = categories.find((category) => category.handle === handle)
  if (!category) {
    category = categories[0]
  }
  return category ? { ...category, posts } : null
}

export async function getCategoriesWithPosts() {
  const categories = await getCategories()
  const posts = await getPostsDefault()
  return categories.map((category) => ({
    ...category,
    posts: posts.slice(0, 8),
  }))
}

// TAGS
function _getStaticTags() {
  return [
    { id: 'tag-1', name: 'Technology', handle: 'technology', description: 'Explore the latest innovations, gadgets, and tech trends shaping our digital future.', count: 10 },
    { id: 'tag-2', name: 'Travel', handle: 'travel', description: 'Explore travel guides, destination reviews, and adventure stories from around the world.', count: 10 },
    { id: 'tag-3', name: 'Food', handle: 'food', description: 'Discover the best food and drink experiences, from local cuisine to gourmet dining.', count: 10 },
    { id: 'tag-4', name: 'Health', handle: 'health', description: 'Stay updated with health and wellness news, tips, and expert advice.', count: 10 },
    { id: 'tag-5', name: 'Science', handle: 'science', description: 'Explore the latest scientific discoveries, research, and breakthroughs.', count: 10 },
    { id: 'tag-6', name: 'History', handle: 'history', description: 'Discover historical events, cultural heritage, and the stories of our past.', count: 10 },
    { id: 'tag-7', name: 'Art', handle: 'art', description: 'Explore the world of art, from painting to sculpture and everything in between.', count: 10 },
    { id: 'tag-8', name: 'Photography', handle: 'photography', description: 'Discover the art of photography, from landscape shots to portrait techniques and editing tips.', count: 15 },
    { id: 'tag-9', name: 'Music', handle: 'music', description: 'Explore music reviews, artist interviews, and the latest trends in the music industry.', count: 12 },
    { id: 'tag-10', name: 'Architecture', handle: 'architecture', description: 'Discover architectural marvels, design trends, and insights into the world of building and construction.', count: 8 },
    { id: 'tag-11', name: 'Wellness', handle: 'wellness', description: 'Find tips and advice for mental and physical wellness, including meditation, yoga, and healthy living.', count: 14 },
    { id: 'tag-12', name: 'Education', handle: 'education', description: 'Stay informed about educational trends, learning resources, and academic insights.', count: 11 },
  ]
}

export async function getTags() {
  if (isSanityConfigured) {
    try {
      const tags = await sanityFetch<TTag[]>({ query: tagsQuery, tags: ['tags'] })
      return tags || []
    } catch {
      return []
    }
  }
  return _getStaticTags()
}

export async function getTagsWithPosts() {
  const tags = await getTags()
  const posts = await getPostsDefault()
  return tags.map((tag) => ({
    ...tag,
    posts: posts.slice(0, 8),
  }))
}

export async function getTagByHandle(handle: string) {
  handle = handle?.toLowerCase()
  const posts = (await getAllPosts()).slice(0, 12)

  if (handle === 'all') {
    return { id: 'tag-all', name: 'All articles', handle: 'all', description: 'Explore all articles', count: 2500, posts }
  }

  if (isSanityConfigured) {
    try {
      const tag = await sanityFetch<TTag | null>({
        query: tagByHandleQuery,
        params: { handle },
        tags: ['tags'],
      })
      if (tag) return { ...tag, posts }
      return null
    } catch {
      return null
    }
  }

  const tags = await getTags()
  let tag = tags.find((tag) => tag.handle === handle)
  if (!tag) {
    tag = tags[0]
  }
  return tag ? { ...tag, posts } : null
}

// Types
export type TCategory = ReturnType<typeof _getStaticCategories>[number] & {
  posts?: TPost[]
}

export type TTag = ReturnType<typeof _getStaticTags>[number] & {
  posts?: TPost[]
}
