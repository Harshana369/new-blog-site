import { groq } from 'next-sanity'

// Shared projections
const imageProjection = `{
  "src": asset->url,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`

const authorMiniProjection = `{
  "id": _id,
  "name": name,
  "handle": slug.current,
  "avatar": avatar${imageProjection}
}`

const categoryMiniProjection = `{
  "id": _id,
  "name": name,
  "handle": slug.current,
  "color": coalesce(color, "blue")
}`

const tagMiniProjection = `{
  "id": _id,
  "name": name,
  "handle": slug.current,
  "color": coalesce(color, "blue")
}`

// ─── POSTS ───────────────────────────────────────────────
export const postsQuery = groq`
*[_type == "post" && status == "published"] | order(publishedAt desc) {
  "id": _id,
  "featuredImage": featuredImage${imageProjection},
  title,
  "handle": slug.current,
  excerpt,
  "date": publishedAt,
  readingTime,
  "commentCount": 0,
  "viewCount": 0,
  "bookmarkCount": 0,
  "bookmarked": false,
  "likeCount": 0,
  "liked": false,
  postType,
  status,
  "author": author->${authorMiniProjection},
  "categories": categories[]->${categoryMiniProjection},
  "audioUrl": audioUrl,
  "videoUrl": videoUrl,
  "galleryImgs": galleryImages[].asset->url
}`

export const postsByTypeQuery = groq`
*[_type == "post" && status == "published" && postType == $postType] | order(publishedAt desc) {
  "id": _id,
  "featuredImage": featuredImage${imageProjection},
  title,
  "handle": slug.current,
  excerpt,
  "date": publishedAt,
  readingTime,
  "commentCount": 0,
  "viewCount": 0,
  "bookmarkCount": 0,
  "bookmarked": false,
  "likeCount": 0,
  "liked": false,
  postType,
  status,
  "author": author->${authorMiniProjection},
  "categories": categories[]->${categoryMiniProjection},
  "audioUrl": audioUrl,
  "videoUrl": videoUrl,
  "galleryImgs": galleryImages[].asset->url
}`

export const postByHandleQuery = groq`
*[_type == "post" && slug.current == $handle][0] {
  "id": _id,
  "featuredImage": featuredImage${imageProjection},
  title,
  "handle": slug.current,
  excerpt,
  "date": publishedAt,
  readingTime,
  "commentCount": 0,
  "viewCount": 0,
  "bookmarkCount": 0,
  "bookmarked": false,
  "likeCount": 0,
  "liked": false,
  postType,
  status,
  "author": author->{
    "id": _id,
    "name": name,
    "handle": slug.current,
    "avatar": avatar${imageProjection},
    "description": description
  },
  "categories": categories[]->${categoryMiniProjection},
  "tags": tags[]->${tagMiniProjection},
  "audioUrl": audioUrl,
  "videoUrl": videoUrl,
  "galleryImgs": galleryImages[].asset->url,
  "content": body,
  "reviewData": reviewData {
    overallScore,
    ratings[] { category, score },
    pros,
    cons,
    verdict,
    awardBadge
  },
  "product": product->{
    "id": _id,
    "name": name,
    "slug": slug.current,
    brand,
    description,
    price,
    currency,
    "images": images[]${imageProjection},
    specifications[] { label, value },
    affiliateLinks[] { store, url, price, isPrimary },
    category
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && status == "published"].slug.current`

// ─── AUTHORS ─────────────────────────────────────────────
export const authorsQuery = groq`
*[_type == "author"] | order(name asc) {
  "id": _id,
  name,
  "handle": slug.current,
  career,
  description,
  "count": count(*[_type == "post" && references(^._id) && status == "published"]),
  "joinedDate": _createdAt,
  "reviewCount": 0,
  "rating": 4.5,
  "avatar": avatar${imageProjection},
  "cover": cover${imageProjection}
}`

export const authorByHandleQuery = groq`
*[_type == "author" && slug.current == $handle][0] {
  "id": _id,
  name,
  "handle": slug.current,
  career,
  description,
  "count": count(*[_type == "post" && references(^._id) && status == "published"]),
  "joinedDate": _createdAt,
  "reviewCount": 0,
  "rating": 4.5,
  "avatar": avatar${imageProjection},
  "cover": cover${imageProjection},
  socialLinks
}`

export const authorSlugsQuery = groq`
*[_type == "author"].slug.current`

// ─── TRENDING TOPICS ────────────────────────────────────
export const trendingTopicsQuery = groq`
*[_type == "trendingTopics"][0] {
  heading,
  subHeading,
  "categories": categories[]->{
    "id": _id,
    name,
    "handle": slug.current,
    description,
    color,
    "count": count(*[_type == "post" && references(^._id) && status == "published"]),
    "date": _createdAt,
    "thumbnail": thumbnail${imageProjection}
  }
}`

// ─── LATEST ARTICLES ───────────────────────────────────
export const latestArticlesQuery = groq`
*[_type == "latestArticles"][0] {
  heading,
  subHeading,
  "posts": posts[]->{
    "id": _id,
    "featuredImage": featuredImage${imageProjection},
    title,
    "handle": slug.current,
    excerpt,
    "date": publishedAt,
    readingTime,
    "commentCount": 0,
    "viewCount": 0,
    "bookmarkCount": 0,
    "bookmarked": false,
    "likeCount": 0,
    "liked": false,
    postType,
    status,
    "author": author->${authorMiniProjection},
    "categories": categories[]->${categoryMiniProjection},
    "audioUrl": audioUrl,
    "videoUrl": videoUrl,
    "galleryImgs": galleryImages[].asset->url
  }
}`

// ─── LATEST AUDIO ARTICLES ────────────────────────────
export const latestAudioArticlesQuery = groq`
*[_type == "latestAudioArticles"][0] {
  heading,
  subHeading,
  "posts": posts[]->{
    "id": _id,
    "featuredImage": featuredImage${imageProjection},
    title,
    "handle": slug.current,
    excerpt,
    "date": publishedAt,
    readingTime,
    "commentCount": 0,
    "viewCount": 0,
    "bookmarkCount": 0,
    "bookmarked": false,
    "likeCount": 0,
    "liked": false,
    postType,
    status,
    "author": author->${authorMiniProjection},
    "categories": categories[]->${categoryMiniProjection},
    "audioUrl": audioUrl,
    "videoUrl": videoUrl,
    "galleryImgs": galleryImages[].asset->url
  }
}`

// ─── CATEGORIES ──────────────────────────────────────────
export const categoriesQuery = groq`
*[_type == "category"] | order(name asc) {
  "id": _id,
  name,
  "handle": slug.current,
  description,
  color,
  "count": count(*[_type == "post" && references(^._id) && status == "published"]),
  "date": _createdAt,
  "thumbnail": thumbnail${imageProjection}
}`

export const categoryByHandleQuery = groq`
*[_type == "category" && slug.current == $handle][0] {
  "id": _id,
  name,
  "handle": slug.current,
  description,
  color,
  "count": count(*[_type == "post" && references(^._id) && status == "published"]),
  "date": _createdAt,
  "thumbnail": thumbnail${imageProjection}
}`

export const categorySlugsQuery = groq`
*[_type == "category"].slug.current`

// ─── TAGS ────────────────────────────────────────────────
export const tagsQuery = groq`
*[_type == "tag"] | order(name asc) {
  "id": _id,
  name,
  "handle": slug.current,
  description,
  "count": count(*[_type == "post" && references(^._id) && status == "published"])
}`

export const tagByHandleQuery = groq`
*[_type == "tag" && slug.current == $handle][0] {
  "id": _id,
  name,
  "handle": slug.current,
  description,
  "count": count(*[_type == "post" && references(^._id) && status == "published"])
}`

export const tagSlugsQuery = groq`
*[_type == "tag"].slug.current`

// ─── SEARCH ─────────────────────────────────────────────
export const searchPostsQuery = groq`
*[_type == "post" && status == "published" && (
  title match $query + "*" ||
  excerpt match $query + "*" ||
  pt::text(body) match $query + "*"
)] | score(
  boost(title match $query + "*", 3),
  boost(excerpt match $query + "*", 2),
  boost(pt::text(body) match $query + "*", 1)
) | order(_score desc) [0...$limit] {
  "id": _id,
  "featuredImage": featuredImage${imageProjection},
  title,
  "handle": slug.current,
  excerpt,
  "date": publishedAt,
  readingTime,
  "commentCount": 0,
  "viewCount": 0,
  "bookmarkCount": 0,
  "bookmarked": false,
  "likeCount": 0,
  "liked": false,
  postType,
  status,
  "author": author->${authorMiniProjection},
  "categories": categories[]->${categoryMiniProjection},
  "audioUrl": audioUrl,
  "videoUrl": videoUrl,
  "galleryImgs": galleryImages[].asset->url
}`

// ─── ADVERTISEMENT ──────────────────────────────────────
export const advertisementQuery = groq`
*[_type == "advertisement"][0] {
  label,
  "image": image${imageProjection},
  url
}`

// ─── LIFE STYLES ────────────────────────────────────────
export const lifestylesQuery = groq`
*[_type == "lifestyles"][0] {
  heading,
  subHeading,
  "tabs": tabs[] {
    "category": category->{ "id": _id, name },
    "posts": posts[]->{
      "id": _id,
      "featuredImage": featuredImage${imageProjection},
      title,
      "handle": slug.current,
      excerpt,
      "date": publishedAt,
      readingTime,
      "commentCount": 0,
      "viewCount": 0,
      "bookmarkCount": 0,
      "bookmarked": false,
      "likeCount": 0,
      "liked": false,
      postType,
      status,
      "author": author->${authorMiniProjection},
      "categories": categories[]->${categoryMiniProjection},
      "audioUrl": audioUrl,
      "videoUrl": videoUrl,
      "galleryImgs": galleryImages[].asset->url
    }
  }
}`

// ─── NEWSLETTER ─────────────────────────────────────────
export const newsletterQuery = groq`
*[_type == "newsletter"][0] {
  heading,
  description,
  benefits,
  placeholder,
  "image": image${imageProjection}
}`

// ─── TOP AUTHORS ────────────────────────────────────────
export const topAuthorsQuery = groq`
*[_type == "topAuthors"][0] {
  heading,
  subHeading,
  "authors": authors[]->{
    "id": _id,
    name,
    "handle": slug.current,
    career,
    description,
    "count": count(*[_type == "post" && references(^._id) && status == "published"]),
    "joinedDate": _createdAt,
    "reviewCount": 0,
    "rating": 4.5,
    "avatar": avatar${imageProjection},
    "cover": cover${imageProjection}
  }
}`

// ─── VIDEOS SECTION ─────────────────────────────────────
export const videosSectionQuery = groq`
*[_type == "videosSection"][0] {
  heading,
  subHeading,
  "videos": videos[] {
    "id": _key,
    title,
    "video": videoUrl,
    "thumbnail": thumbnail.asset->url
  }
}`

// ─── SEA TRAVEL ─────────────────────────────────────────
export const seaTravelQuery = groq`
*[_type == "seaTravel"][0] {
  heading,
  subHeading,
  "posts": posts[]->{
    "id": _id,
    "featuredImage": featuredImage${imageProjection},
    title,
    "handle": slug.current,
    excerpt,
    "date": publishedAt,
    readingTime,
    "commentCount": 0,
    "viewCount": 0,
    "bookmarkCount": 0,
    "bookmarked": false,
    "likeCount": 0,
    "liked": false,
    postType,
    status,
    "author": author->${authorMiniProjection},
    "categories": categories[]->${categoryMiniProjection},
    "audioUrl": audioUrl,
    "videoUrl": videoUrl,
    "galleryImgs": galleryImages[].asset->url
  }
}`

// ─── SITE SETTINGS ──────────────────────────────────────
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  description,
  "logo": logo${imageProjection},
  "ogImage": ogImage.asset->url,
  siteUrl,
  socialLinks,
  heroHeading,
  heroSubHeading,
  heroButtonText,
  heroButtonUrl,
  "heroImage": heroImage${imageProjection},
  "heroUnderlineImage": heroUnderlineImage${imageProjection}
}`

// ─── REVIEW POSTS ───────────────────────────────────────
export const reviewPostsQuery = groq`
*[_type == "post" && status == "published" && postType == "review"] | order(publishedAt desc) {
  "id": _id,
  "featuredImage": featuredImage${imageProjection},
  title,
  "handle": slug.current,
  excerpt,
  "date": publishedAt,
  readingTime,
  postType,
  status,
  "author": author->${authorMiniProjection},
  "categories": categories[]->${categoryMiniProjection},
  "reviewData": reviewData {
    overallScore,
    awardBadge
  },
  "product": product->{
    "name": name,
    brand,
    price,
    currency,
    "images": images[]${imageProjection}
  }
}`

// ─── PRODUCTS FOR COMPARISON ────────────────────────────
export const productsBySlugQuery = groq`
*[_type == "product" && slug.current in $slugs] {
  "id": _id,
  "name": name,
  "slug": slug.current,
  brand,
  description,
  price,
  currency,
  "images": images[]${imageProjection},
  specifications[] { label, value },
  affiliateLinks[] { store, url, price, isPrimary },
  category,
  "reviewScore": *[_type == "post" && references(^._id) && postType == "review"][0].reviewData.overallScore
}`
