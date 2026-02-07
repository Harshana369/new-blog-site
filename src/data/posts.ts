import { sanityFetch } from '@/lib/sanity/fetcher'
import { postsQuery, postsByTypeQuery, postByHandleQuery } from '@/lib/sanity/queries'
import type { TReviewData, TProduct } from './types'
import { _demo_author_image_urls } from './authors'

const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id'

// _demo_post_image_urls has length 20
const _demo_post_image_urls = [
  'https://images.unsplash.com/photo-1731437519600-f1219cded2cd?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1539477857993-860599c2e840?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1534445867742-43195f401b6c?q=80&w=2454&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1666792890871-0e332b76967d?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1592396355679-1e2a094e8bf1?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?q=80&w=2639&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1535640597419-853d35e6364f?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1674507593594-964ea25ce06a?q=80&w=2171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1560703650-db93f86c37b3?q=80&w=3791&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1641301365918-c8d4b9ce7d11?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1556104577-09754a15dff2?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1743832354699-c89a3a138237?q=80&w=3057&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1559601531-503da8fa81f7?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1622272516403-69dbe7ec7ecd?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1469796466635-455ede028aca?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

const _demo_post_audio_urls = [
  'https://files.booliitheme.com/wp-content/uploads/2024/12/paudio.mp3',
  'https://files.booliitheme.com/wp-content/uploads/2024/12/paudio2.mp3',
  'https://files.booliitheme.com/wp-content/uploads/2025/06/paudio3.mp3',
  'https://files.booliitheme.com/wp-content/uploads/2025/06/paudio4.mp3',
  'https://files.booliitheme.com/wp-content/uploads/2025/06/paudio5.mp3',
  'https://files.booliitheme.com/wp-content/uploads/2025/06/paudio6.mp3',
  'https://files.booliitheme.com/wp-content/uploads/2025/06/paudio7.mp3',
  'https://files.booliitheme.com/wp-content/uploads/2024/12/paudio.mp3',
  'https://files.booliitheme.com/wp-content/uploads/2024/12/paudio2.mp3',
]

const _demo_post_video_urls = [
  'https://www.youtube.com/watch?v=vHBodN0Mirs',
  'https://www.youtube.com/watch?v=FBFcNPa36m8',
  'https://www.youtube.com/watch?v=oP1rIPkJte0',
  'https://www.youtube.com/watch?v=y7gKlzvg8xk',
  'https://www.youtube.com/watch?v=VJg37fVPy9I',
  'https://www.youtube.com/watch?v=2CquRQiDzx8',
  'https://www.youtube.com/watch?v=vHBodN0Mirs',
]

function _makeAuthor(idx: number, name: string, handle: string) {
  return { id: `author-${idx}`, name, handle, avatar: { src: _demo_author_image_urls[idx % 10], alt: name, width: 1920, height: 1080 } }
}

function _makePost(id: string, imgIdx: number, title: string, handle: string, excerpt: string, date: string, readingTime: number, commentCount: number, viewCount: number, bookmarkCount: number, likeCount: number, postType: string, author: ReturnType<typeof _makeAuthor>, categories: { id: string; name: string; handle: string; color: string }[], extra?: Record<string, unknown>) {
  return {
    id,
    featuredImage: { src: _demo_post_image_urls[imgIdx % 20], alt: title, width: 1920, height: 1080 },
    title,
    handle,
    excerpt,
    date,
    readingTime,
    commentCount,
    viewCount,
    bookmarkCount,
    bookmarked: false,
    likeCount,
    liked: false,
    postType,
    status: 'published' as const,
    author,
    categories,
    ...extra,
  }
}

function _getStaticPostsDefault() {
  return [
    _makePost('post-1', 0, "Lenovo's smarter devices stoke professional passions", 'lenovo-smarter-devices-stoke-professional-passions', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '2025-06-10T12:00:00Z', 2, 11, 2504, 3007, 3007, 'standard', _makeAuthor(1, 'Sarah Wilson', 'sarah-wilson'), [{ id: 'category-1', name: 'Garden', handle: 'garden', color: 'indigo' }]),
    _makePost('post-2', 1, 'The Future of Remote Work in 2025 - Complete Guide', 'future-of-remote-work-2025', 'Remote work is evolving rapidly. Discover the latest trends and technologies shaping the future of work.', '2025-05-15T12:00:00Z', 4, 23, 3200, 1500, 2800, 'standard', _makeAuthor(2, 'Dr. Michael Chen', 'michael-chen'), [{ id: 'category-2', name: 'Technology', handle: 'technology', color: 'blue' }]),
    _makePost('post-3', 2, 'The Complete Guide to Living Sustainably', 'sustainable-living-complete-guide', 'Learn how to reduce your carbon footprint and live a more sustainable lifestyle with these practical tips.', '2025-04-20T12:00:00Z', 6, 45, 4800, 2200, 3500, 'standard', _makeAuthor(3, 'Emma Green', 'emma-green'), [{ id: 'category-3', name: 'Fitness', handle: 'fitness', color: 'red' }]),
    _makePost('post-4', 3, 'AI Revolution: What to Expect in the Next Decade', 'ai-revolution-next-decade', 'Exploring the potential impact of artificial intelligence on our daily lives and future society.', '2025-03-05T12:00:00Z', 5, 67, 5600, 2800, 4200, 'standard', _makeAuthor(4, 'Dr. Michael Chen', 'michael-chen'), [{ id: 'category-4', name: 'Finance', handle: 'finance', color: 'green' }]),
    _makePost('post-5', 4, 'Fitness Trends That Will Dominate 2025 - A Complete Guide', 'fitness-trends-2025', 'Discover the latest fitness innovations and workout trends that are reshaping the fitness industry.', '2025-02-15T12:00:00Z', 3, 34, 3800, 1900, 2600, 'standard', _makeAuthor(5, 'Lisa Martinez', 'lisa-martinez'), [{ id: 'category-5', name: 'Fitness', handle: 'fitness', color: 'red' }]),
    _makePost('post-6', 5, 'Understanding Cryptocurrency in 2025 - A Complete Guide', 'understanding-cryptocurrency-2025', 'A comprehensive guide to cryptocurrency trends, blockchain technology, and digital finance.', '2025-01-20T12:00:00Z', 7, 89, 7200, 3600, 4800, 'standard', _makeAuthor(6, 'David Thompson', 'david-thompson'), [{ id: 'category-6', name: 'Finance', handle: 'finance', color: 'green' }]),
  ]
}

function _getStaticPostsAudio() {
  const titles = [
    ['Jazz Night Live: Miles Davis Tribute', 'jazz-night-live-miles-davis-tribute'],
    ['The Art of Sound Design in Film', 'art-of-sound-design-in-film'],
    ['Classical Music: A Journey Through Beethoven', 'classical-music-beethoven-journey'],
    ['Podcast Production Masterclass', 'podcast-production-masterclass'],
    ['Electronic Music Revolution', 'electronic-music-revolution'],
    ['The Beatles: Musical Analysis', 'the-beatles-musical-analysis'],
    ['Lo-Fi Hip Hop: The Making of Chill Beats', 'lo-fi-hip-hop-chill-beats'],
    ['African Rhythms: Traditional to Modern', 'african-rhythms-traditional-modern'],
    ['Music Production: Your First Track', 'music-production-first-track'],
    ['Opera Essentials for Beginners', 'opera-essentials-beginners'],
    ['Country Music: Roots and Evolution', 'country-music-roots-evolution'],
    ['Ambient Soundscapes: Creating Atmosphere', 'ambient-soundscapes-creating-atmosphere'],
  ]
  return titles.map((t, i) =>
    _makePost(`post-audio-${i + 1}`, 6 + (i % 14), t[0], t[1],
      'Experience the beauty of music and audio storytelling.', `2025-0${Math.max(1, 6 - Math.floor(i / 2))}-${15 - i}T12:00:00Z`,
      Math.floor(Math.random() * 5) + 2, Math.floor(Math.random() * 100), Math.floor(Math.random() * 5000), Math.floor(Math.random() * 2000), Math.floor(Math.random() * 3000),
      'audio', _makeAuthor((i % 10) + 1, ['Sarah Wilson', 'Dr. Michael Chen', 'Emma Green', 'Lisa Martinez', 'David Thompson', 'John Anderson', 'Sophia Lee', 'Dr. James Wilson', 'Maria Rodriguez', 'Alex Kumar'][i % 10], ['sarah-wilson', 'michael-chen', 'emma-green', 'lisa-martinez', 'david-thompson', 'john-anderson', 'sophia-lee', 'james-wilson', 'maria-rodriguez', 'alex-kumar'][i % 10]),
      [{ id: `category-${7 + (i % 4)}`, name: ['Music', 'Architecture', 'Wellness', 'Education'][i % 4], handle: ['music', 'architecture', 'wellness', 'education'][i % 4], color: ['pink', 'gray', 'teal', 'orange'][i % 4] }],
      { audioUrl: _demo_post_audio_urls[i % 9] }
    )
  )
}

function _getStaticPostsVideo() {
  const titles = [
    ['Wildlife Wonders: Hidden Life of Rainforests', 'wildlife-wonders-hidden-life-of-rainforests'],
    ['Architecture: Inside the World\'s Most Iconic Buildings', 'architecture-iconic-buildings'],
    ['Street Food Adventures: Tokyo Edition', 'street-food-adventures-tokyo'],
    ['The Science of Climate Change Explained', 'science-climate-change-explained'],
    ['Extreme Sports: Base Jumping Chronicles', 'extreme-sports-base-jumping'],
    ['Space Exploration: Mars Mission Updates', 'space-exploration-mars-mission'],
    ['Documentary: Life in the Arctic', 'documentary-life-in-arctic'],
    ['Tech Review: Latest Smartphone Comparison', 'tech-review-smartphone-comparison'],
    ['Travel Vlog: Iceland Ring Road', 'travel-vlog-iceland-ring-road'],
    ['Cooking Masterclass: Italian Cuisine', 'cooking-masterclass-italian-cuisine'],
    ['Fitness: Full Body Workout Guide', 'fitness-full-body-workout-guide'],
    ['History: Ancient Egyptian Civilization', 'history-ancient-egyptian-civilization'],
  ]
  return titles.map((t, i) =>
    _makePost(`post-video-${i + 1}`, (i + 10) % 20, t[0], t[1],
      'Watch this incredible visual journey and discover new perspectives.', `2025-0${Math.max(1, 5 - Math.floor(i / 3))}-${20 - i}T12:00:00Z`,
      Math.floor(Math.random() * 8) + 3, Math.floor(Math.random() * 120), Math.floor(Math.random() * 8000), Math.floor(Math.random() * 3000), Math.floor(Math.random() * 5000),
      'video', _makeAuthor((i + 3) % 10, ['Lisa Martinez', 'David Thompson', 'John Anderson', 'Sophia Lee', 'Dr. James Wilson', 'Maria Rodriguez', 'Alex Kumar', 'Sarah Wilson', 'Dr. Michael Chen', 'Emma Green'][i % 10], ['lisa-martinez', 'david-thompson', 'john-anderson', 'sophia-lee', 'james-wilson', 'maria-rodriguez', 'alex-kumar', 'sarah-wilson', 'michael-chen', 'emma-green'][i % 10]),
      [{ id: `category-${(i % 10) + 1}`, name: ['Garden', 'Technology', 'Fitness', 'Finance', 'Travel', 'Photography', 'Music', 'Architecture', 'Wellness', 'Education'][i % 10], handle: ['garden', 'technology', 'fitness', 'finance', 'travel', 'photography', 'music', 'architecture', 'wellness', 'education'][i % 10], color: ['indigo', 'blue', 'red', 'green', 'yellow', 'purple', 'pink', 'gray', 'teal', 'orange'][i % 10] }],
      { videoUrl: _demo_post_video_urls[i % 7] }
    )
  )
}

function _getStaticPostsGallery() {
  const titles = [
    ['Girls in Ocean Science Conference: A First at Maritime Museum', 'girls-in-ocean-science-conference-a-first-at-maritime-museum'],
    ['Mountain Photography: Peaks of the World', 'mountain-photography-peaks-world'],
    ['Urban Street Art Gallery: City Canvas', 'urban-street-art-gallery-city-canvas'],
    ['Underwater Photography: Coral Reef Collection', 'underwater-photography-coral-reef'],
    ['Autumn Colors: A Nature Photo Essay', 'autumn-colors-nature-photo-essay'],
    ['Desert Landscapes: Sand and Sky', 'desert-landscapes-sand-and-sky'],
    ['Night Photography: City Lights Collection', 'night-photography-city-lights'],
    ['Wildlife Wonders: Nature\'s Hidden Treasures', 'wildlife-wonders-natures-hidden-treasures'],
    ['Urban Perspectives: Modern Architecture', 'urban-perspectives-modern-architecture'],
  ]
  return titles.map((t, i) =>
    _makePost(`post-gallery-${i + 1}`, (i + 2) % 20, t[0], t[1],
      'A stunning visual collection capturing moments of beauty.', `2025-0${Math.max(1, 4 - Math.floor(i / 3))}-${25 - i * 2}T12:00:00Z`,
      Math.floor(Math.random() * 6) + 2, Math.floor(Math.random() * 90), Math.floor(Math.random() * 6000), Math.floor(Math.random() * 2500), Math.floor(Math.random() * 4000),
      'gallery', _makeAuthor((i + 5) % 10, ['John Anderson', 'Sophia Lee', 'Dr. James Wilson', 'Maria Rodriguez', 'Alex Kumar', 'Sarah Wilson', 'Dr. Michael Chen', 'Emma Green', 'Lisa Martinez', 'David Thompson'][i % 10], ['john-anderson', 'sophia-lee', 'james-wilson', 'maria-rodriguez', 'alex-kumar', 'sarah-wilson', 'michael-chen', 'emma-green', 'lisa-martinez', 'david-thompson'][i % 10]),
      [{ id: `category-${(i + 5) % 10 + 1}`, name: 'Photography', handle: 'photography', color: 'purple' }],
      { galleryImgs: _demo_post_image_urls.slice(i, i + 5) }
    )
  )
}

// ─── Public API ────────────────────────────────────────

export async function getPostsDefault() {
  if (isSanityConfigured) {
    try {
      const posts = await sanityFetch<TPost[]>({
        query: postsByTypeQuery,
        params: { postType: 'standard' },
        tags: ['posts'],
      })
      if (posts?.length) return posts
    } catch { /* fall through */ }
  }
  return _getStaticPostsDefault()
}

export async function getPostsAudio() {
  if (isSanityConfigured) {
    try {
      const posts = await sanityFetch<TPost[]>({
        query: postsByTypeQuery,
        params: { postType: 'audio' },
        tags: ['posts'],
      })
      if (posts?.length) return posts
    } catch { /* fall through */ }
  }
  return _getStaticPostsAudio()
}

export async function getPostsVideo() {
  if (isSanityConfigured) {
    try {
      const posts = await sanityFetch<TPost[]>({
        query: postsByTypeQuery,
        params: { postType: 'video' },
        tags: ['posts'],
      })
      if (posts?.length) return posts
    } catch { /* fall through */ }
  }
  return _getStaticPostsVideo()
}

export async function getPostsGallery() {
  if (isSanityConfigured) {
    try {
      const posts = await sanityFetch<TPost[]>({
        query: postsByTypeQuery,
        params: { postType: 'gallery' },
        tags: ['posts'],
      })
      if (posts?.length) return posts
    } catch { /* fall through */ }
  }
  return _getStaticPostsGallery()
}

export async function getAllPosts() {
  if (isSanityConfigured) {
    try {
      const posts = await sanityFetch<TPost[]>({ query: postsQuery, tags: ['posts'] })
      if (posts?.length) return posts
    } catch { /* fall through */ }
  }

  const posts = await Promise.all([getPostsDefault(), getPostsVideo(), getPostsAudio(), getPostsGallery()])
  return posts.flat().sort(() => Math.random() - 0.5)
}

export async function getPostByHandle(handle: string) {
  if (isSanityConfigured) {
    try {
      const post = await sanityFetch<TPostDetail | null>({
        query: postByHandleQuery,
        params: { handle },
        tags: ['posts'],
      })
      if (post) return post
    } catch { /* fall through */ }
  }

  const posts = await getAllPosts()
  let post = posts.find((post) => post.handle === handle) as TPost
  if (!post) {
    post = posts[0]
  }

  return {
    ...post,
    galleryImgs: [...(post.galleryImgs || []), ..._demo_post_image_urls],
    videoUrl: post.videoUrl || 'https://www.youtube.com/watch?v=JcDBFAm9PPI',
    audioUrl: post.audioUrl || 'https://files.booliitheme.com/wp-content/uploads/2025/06/paudio3.mp3',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      ...post.author,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    tags: [
      { id: 'tag-1', name: 'Technology', handle: 'technology', color: 'blue' },
      { id: 'tag-2', name: 'Travel', handle: 'travel', color: 'blue' },
      { id: 'tag-3', name: 'Food', handle: 'food', color: 'blue' },
      { id: 'tag-4', name: 'Health', handle: 'health', color: 'blue' },
    ],
    categories: [
      ...(post.categories || []),
      { id: 'category-typography', name: 'Typography', handle: 'typography', color: 'sky' },
    ],
  }
}

export async function getCommentsByPostId(_postId: string) {
  const comments = [
    {
      id: 1,
      author: {
        id: 'author-1',
        name: 'John Doe',
        handle: 'john-doe',
        avatar: { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'John Doe', width: 1920, height: 1080 },
      },
      date: '2025-06-10',
      content: 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
      like: { count: 96, isLiked: false },
    },
    {
      id: 3,
      author: {
        id: 'author-3',
        name: 'John Anderson',
        handle: 'john-anderson',
        avatar: { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'John Anderson', width: 1920, height: 1080 },
      },
      date: '2025-06-10',
      content: 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.',
      like: { count: 66, isLiked: true },
    },
    {
      id: 4,
      author: {
        id: 'author-4',
        name: 'Sophia Lee',
        handle: 'sophia-lee',
        avatar: { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Sophia Lee', width: 1920, height: 1080 },
      },
      date: '2025-06-10',
      content: 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
      like: { count: 45, isLiked: true },
    },
  ]
  return comments.flat().sort(() => Math.random() - 0.5)
}

// Types
export type TPost = ReturnType<typeof _getStaticPostsDefault>[number] & {
  audioUrl?: string
  videoUrl?: string
  galleryImgs?: string[]
  reviewData?: TReviewData
  product?: TProduct
}
export type TPostDetail = TPost & {
  content: string
  galleryImgs: string[]
  videoUrl: string
  audioUrl: string
  tags: { id: string; name: string; handle: string; color: string }[]
  author: TPost['author'] & { description: string }
}
export type TComment = Awaited<ReturnType<typeof getCommentsByPostId>>[number]
