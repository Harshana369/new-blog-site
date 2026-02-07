# Plan: Transform Ncmaz into a World-Class Product Review Website

## Context

The Ncmaz Next.js template currently uses static demo data in `src/data/`. The goal is to transform it into a production-ready product review website with Sanity CMS, perfect Lighthouse scores (100/100 across all categories on mobile & desktop), and product review features (ratings, pros/cons, comparisons, affiliate links). Deploying to Vercel.

---

## Phase 1: Sanity CMS Setup & Schema Design ✅ COMPLETE

**Install:**
```
npm install next-sanity @sanity/client @sanity/image-url sanity @sanity/vision @portabletext/react
```

**Create files:**
- `.env.local` — Sanity project ID, dataset, API version, tokens, site URL
- `sanity.config.ts` + `sanity.cli.ts` — Root Sanity configuration
- `src/lib/sanity/config.ts` — Centralized config reading env vars
- `src/lib/sanity/client.ts` — Read-only + write Sanity clients
- `src/lib/sanity/image.ts` — `urlFor()` helper via `@sanity/image-url`
- `src/lib/sanity/schemas/` — 7 schema files:
  - `post.ts` — Blog post with postType field (standard/audio/video/gallery/review)
  - `author.ts` — Author with avatar, cover, bio
  - `category.ts` — Category with color, thumbnail
  - `tag.ts` — Tag with description
  - `product.ts` — Product with specs, affiliate links, images, price
  - `review.ts` — Review object (ratings, pros/cons, verdict, award badge)
  - `siteSettings.ts` — Global settings (name, description, logo, nav, OG image)
- `src/app/studio/[[...tool]]/page.tsx` + `layout.tsx` — Embedded Sanity Studio at `/studio`

**Modify:**
- `next.config.mjs` — Add `cdn.sanity.io` to `images.remotePatterns`

**Verify:** Navigate to `/studio`, create test content (post, author, category)

---

## Phase 2: Data Layer Migration (Static -> Sanity GROQ) ✅ COMPLETE

**Create files:**
- `src/lib/sanity/queries.ts` — All GROQ query strings (posts, authors, categories, tags, search, navigation)
- `src/lib/sanity/fetcher.ts` — Typed `sanityFetch<T>()` wrapper with `next: { revalidate, tags }` caching

**Modify files** (replace hardcoded data with GROQ queries, keep function signatures):
- `src/data/posts.ts` — Replace 1800 lines of demo data. Convert inferred types to explicit interfaces (`TPost`, `TPostDetail`, `TComment`). Add `postType: 'review'` and `reviewData?: TReviewData`
- `src/data/authors.ts` — Replace 300 lines of demo data
- `src/data/categories.ts` — Replace 395 lines of demo data
- `src/data/search.ts` — Replace with GROQ full-text search using `score()` and `boost()`
- `src/data/navigation.ts` — Keep static for now (or fetch from siteSettings)
- `src/data/types.ts` — Add `TReviewData`, `TProduct` interfaces
- `src/app/(app)/post/TheContent.tsx` — Replace hardcoded Lorem Ipsum with `<PortableText>` renderer from `@portabletext/react`

**Verify:** All pages render Sanity data. `npm run build` succeeds. 3-5 sample posts visible on site.

---

## Phase 3: Product Review Features ✅ COMPLETE

**Create ~9 new components in `src/components/Review/`:**
- `StarRating.tsx` — SVG star display (0-10 scale) with `aria-label`
- `RatingBreakdown.tsx` — Horizontal progress bars for category scores (design, performance, value, etc.)
- `ProsConsList.tsx` — Two-column pros/cons with green checkmarks and red X icons
- `ProductSpecTable.tsx` — Responsive specification table (label/value pairs)
- `ComparisonTable.tsx` — Multi-product comparison with sticky first column
- `AffiliateButton.tsx` — CTA button with `rel="nofollow sponsored"` and `target="_blank" rel="noopener noreferrer"`
- `ProductCard.tsx` — Sidebar product summary (image, name, price, rating, buy links)
- `ReviewVerdict.tsx` — Verdict box with overall score, summary text, award badge
- `ReviewHeader.tsx` — Review-specific post header showing product info prominently

**Create new routes:**
- `src/app/(app)/reviews/page.tsx` — Reviews archive (filtered by postType === 'review')
- `src/app/(app)/compare/page.tsx` — Product comparison page (`/compare?products=slug1,slug2`)

**Modify:**
- `src/app/(app)/post/SingleHeaderContainer.tsx` — Add `review` case to header style switch
- `src/app/(app)/post/SingleContentContainer.tsx` — Insert review sections (verdict, ratings, pros/cons, specs, affiliate buttons) around content for review posts
- `src/data/navigation.ts` — Add "Reviews" to main navigation
- `src/lib/sanity/queries.ts` — Add review data projections to post queries

**Verify:** Create a full review post in Sanity. All review components render. Affiliate links work. /reviews and /compare pages function.

---

## Phase 4: SEO Perfection (Target: Lighthouse SEO 100) ✅ COMPLETE

**Create files:**
- `src/app/sitemap.ts` — Dynamic sitemap fetching all published posts, categories, tags, authors from Sanity
- `src/app/robots.ts` — Allow `/`, disallow `/studio/`, `/dashboard/`, `/api/`. Include sitemap URL
- `src/lib/structured-data.ts` — JSON-LD generators: `generateArticleLD()`, `generateProductLD()`, `generateReviewLD()`, `generateBreadcrumbLD()`, `generateOrganizationLD()`, `generateWebSiteLD()`
- `src/components/JsonLd.tsx` — Reusable `<script type="application/ld+json">` component

**Modify files — add OG/Twitter/JSON-LD metadata:**
- `src/app/layout.tsx` — `metadataBase`, default OG image, Twitter card config, Organization JSON-LD
- `src/app/(app)/post/[handle]/page.tsx` — Full `generateMetadata()` with OG article, Twitter, canonical, JSON-LD (Article + Review + Breadcrumb)
- `src/app/(app)/post/page-style-2/[handle]/page.tsx` — Same metadata pattern
- `src/app/(app)/post/page-style-3/[handle]/page.tsx` — Same metadata pattern
- `src/app/(app)/category/[handle]/page.tsx` — OG metadata + Breadcrumb JSON-LD
- `src/app/(app)/author/[handle]/page.tsx` — OG metadata + Person JSON-LD
- `src/app/(app)/(home)/(home-1)/page.tsx` — WebSite JSON-LD with SearchAction
- `src/app/(app)/(search)/search/page.tsx` — Add `robots: { index: false, follow: true }`

**Verify:** Lighthouse SEO 100. Validate with Google Rich Results Test. Check sitemap.xml and robots.txt in browser.

---

## Phase 5: Accessibility Fixes (Target: Lighthouse A11y 100) ✅ COMPLETE

**Create:**
- `src/components/SkipToContent.tsx` — Visually hidden skip link, visible on focus

**Fix empty alt text (12+ instances):**
- `src/app/(app)/post/GalleryImages.tsx` — 12 `alt=""` → descriptive alt from Sanity or `Gallery image N for {post.title}`
- `src/components/PostFeaturedMedia/GallerySlider.tsx` — `alt=""` → descriptive
- `src/components/CategoryCards/CardCategory3.tsx` — `alt=""` → category name
- `src/components/SectionHero.tsx` — `alt=""` → descriptive hero text
- `src/app/(app)/post/SingleHeaderContainer.tsx` — `alt="post"` → `alt={title}`

**Fix landmarks & structure:**
- `src/app/layout.tsx` — Add `<SkipToContent />` as first body child
- `src/app/(app)/application-layout.tsx` — Wrap children in `<main id="main-content">`

**Fix image elements:**
- `src/app/(app)/about/SectionFounder.tsx` — Replace `<img>` with `<Image>` (line 90)

**Fix interactive elements:**
- `src/app/(app)/post/SingleContentContainer.tsx` — Add `aria-label` to "Go to top" and progress buttons
- `src/app/(app)/(search)/search/page.tsx` — Associate label with search input

**Fix security/a11y:**
- `src/components/Header/CurrLangDropdown.tsx` — Replace `dangerouslySetInnerHTML` with React SVG components

**Verify:** Lighthouse Accessibility 100. axe DevTools shows 0 issues. Keyboard navigation works. Screen reader tested.

---

## Phase 6: Performance & Best Practices (Target: Lighthouse 100/100) ✅ COMPLETE

**Create error boundaries:**
- `src/app/(app)/error.tsx` — App-level error boundary
- `src/app/(app)/post/error.tsx` — Post error boundary
- `src/app/(app)/category/error.tsx` — Category error boundary

**Remove 9 console statements from:**
- `src/components/AudioProvider.tsx`
- `src/data/posts.ts`
- `src/lib/tiptap-utils.ts`
- `src/hooks/useIntersectionObserver.ts`
- `src/utils/isInViewPortIntersectionObserver.ts`
- `src/components/tiptap-ui/text-align-button/text-align-button.tsx`
- `src/components/tiptap-ui/color-highlight-button/color-highlight-button.tsx`
- `src/components/tiptap-templates/simple/simple-editor.tsx` (2 instances)

**Add security headers in `next.config.mjs`:**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `poweredByHeader: false`
- `images.formats: ['image/avif', 'image/webp']`

**Dynamic imports for heavy client components:**
- `SectionVideos` (includes react-player) — `dynamic(() => import(...), { ssr: false })`
- Video player in post pages — `dynamic(() => import('react-player/lazy'), { ssr: false })`

**Verify:** Lighthouse Performance 100 + Best Practices 100. No console output. Security headers confirmed via securityheaders.com. Error boundaries catch errors gracefully.

---

## Phase 7: Vercel Deployment + Sanity Webhooks + ISR ✅ CODE COMPLETE

**Create:**
- `src/app/api/revalidate/route.ts` — Webhook handler: validates Sanity signature, calls `revalidateTag()`/`revalidatePath()` based on document type

**Modify:**
- `src/lib/sanity/fetcher.ts` — Add cache tags to all queries (`['posts']`, `['authors']`, etc.)
- All data functions in `src/data/*.ts` — Pass appropriate tags to `sanityFetch()`
- Delete `src/app/api/hello/route.ts` (unused demo route)

**Vercel setup:**
1. Push to GitHub → Connect to Vercel
2. Set environment variables (Sanity project ID, tokens, site URL, revalidation secret)
3. Configure custom domain
4. Deploy

**Sanity webhook setup:**
- URL: `https://yourdomain.com/api/revalidate`
- Trigger: Create, Update, Delete on post, author, category, tag, product, siteSettings
- Secret: Same as `SANITY_REVALIDATION_SECRET`
- Projection: `{_type, slug}`

**Verify:** Full Lighthouse 100/100/100/100 on production. Edit in Sanity → site updates within seconds. Google Rich Results validated. Sitemap indexed.

---

## File Summary

**~35 new files** across Sanity schemas, Review components, SEO files, error boundaries, API routes, and studio pages.

**~25 modified files** across data layer, page metadata, accessibility fixes, security headers, and console statement removal.

**1 package install command:**
```
npm install next-sanity @sanity/client @sanity/image-url sanity @sanity/vision @portabletext/react
```

---

## Completion Log

### Phase 1 — Sanity CMS Setup & Schema Design ✅
- Installed all Sanity packages
- Created `.env.local`, `sanity.config.ts`, `sanity.cli.ts`
- Created `src/lib/sanity/` with config, client, image helpers, and 7 schemas (post, author, category, tag, product, review, siteSettings)
- Embedded Sanity Studio at `/studio`
- Added `cdn.sanity.io` to `next.config.mjs` remote patterns

### Phase 2 — Data Layer Migration ✅
- Created GROQ queries in `src/lib/sanity/queries.ts`
- Created typed fetcher in `src/lib/sanity/fetcher.ts`
- Replaced static demo data in `src/data/posts.ts`, `authors.ts`, `categories.ts`
- Added `TReviewData`, `TProduct` interfaces to `src/data/types.ts`
- Replaced hardcoded content with `<PortableText>` renderer in `TheContent.tsx`

### Phase 3 — Product Review Features ✅
- Created 9 review components in `src/components/Review/`
- Created `/reviews` and `/compare` routes
- Integrated review sections into post pages (`SingleHeaderContainer`, `SingleContentContainer`)
- Added "Reviews" to navigation
- Added review data projections to GROQ queries

### Phase 4 — SEO Perfection ✅
- Created `src/app/sitemap.ts` and `src/app/robots.ts`
- Created `src/lib/structured-data.ts` with JSON-LD generators
- Created `src/components/JsonLd.tsx`
- Added `generateMetadata()` with OG/Twitter/canonical to all dynamic pages
- Added JSON-LD (Article, Review, Product, Breadcrumb, Organization, WebSite) to relevant pages

### Phase 5 — Accessibility Fixes ✅
- Created `src/components/SkipToContent.tsx` and added to `layout.tsx`
- Fixed 12+ empty `alt=""` attributes across gallery, category, hero, and header components
- Wrapped children in `<main id="main-content">` in `application-layout.tsx`
- Replaced `<img>` with `<Image>` in `SectionFounder.tsx`
- Added `aria-label` attributes to interactive elements
- Replaced `dangerouslySetInnerHTML` in `CurrLangDropdown.tsx`

### Phase 6 — Performance & Best Practices ✅
- Created 3 error boundaries: app-level, post, and category
- Removed all 9 console statements from 8 files
- Added all security headers in `next.config.mjs` (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS)
- Set `poweredByHeader: false` and `images.formats: ['image/avif', 'image/webp']`
- Dynamically imported `SectionVideos` with `{ ssr: false }` in all 4 home pages
- Dynamically imported `react-player/lazy` in `VideoPlayer.tsx` and `MediaVideo.tsx`

### Phase 7 — Vercel Deployment + Sanity Webhooks + ISR ✅ CODE COMPLETE
- Created `src/app/api/revalidate/route.ts` with HMAC-SHA256 signature validation and tag-based revalidation
- Deleted unused `src/app/api/hello/route.ts`
- Added `tags` parameter to `sanityFetch()` in `src/lib/sanity/fetcher.ts` with Next.js caching
- All data functions pass cache tags: `['posts']`, `['authors']`, `['categories']`, `['tags']`
- **Remaining:** Vercel deployment, env vars, custom domain, Sanity webhook configuration
