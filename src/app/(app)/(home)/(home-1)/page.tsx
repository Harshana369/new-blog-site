import BackgroundSection from '@/components/BackgroundSection'
import Card15Podcast from '@/components/PostCards/Card15Podcast'
import Card16Podcast from '@/components/PostCards/Card16Podcast'
import SectionAds from '@/components/SectionAds'
import SectionHero from '@/components/SectionHero'
import SectionMagazine4 from '@/components/SectionMagazine4'
import SectionPostsWithWidgets from '@/components/SectionPostsWithWidgets'
import SectionSliderNewAuthors from '@/components/SectionSliderNewAuthors'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import { getAuthors, getTopAuthorsSection } from '@/data/authors'
import { getCategories, getTrendingTopics, getLatestArticlesSection, getLatestAudioArticlesSection, getLifestylesSection, getSeaTravelSection, getLatestArticlesWithWidgetsSection } from '@/data/categories'
import { getAllPosts, getPostsAudio, type TPost } from '@/data/posts'
import { getSiteSettings, getAdvertisement, getNewsletter, getVideosSection } from '@/data/site'
import HeadingWithSub from '@/shared/Heading'
import Vector1 from '@/images/Vector1.png'
import rightImg from '@/images/hero-right.png'
import SectionVideos from '@/components/SectionVideosLazy'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page of the application showcasing various sections and posts.',
}

const Page = async () => {
  const posts = await getAllPosts()
  const audioPosts = await getPostsAudio()
  const authors = await getAuthors()
  const topAuthors = await getTopAuthorsSection()
  const categories = await getCategories()
  const trendingTopics = await getTrendingTopics()
  const latestArticles = await getLatestArticlesSection()
  const latestAudioArticles = await getLatestAudioArticlesSection()
  const lifestyles = await getLifestylesSection()
  const seaTravel = await getSeaTravelSection()
  const advertisement = await getAdvertisement()
  const newsletter = await getNewsletter()
  const videosSection = await getVideosSection()
  const latestArticlesWithWidgets = await getLatestArticlesWithWidgetsSection()
  const siteSettings = await getSiteSettings()

  // Process hero heading - handle both \n and <br /> tags from Sanity
  let heroHeadingContent = siteSettings.heroHeading || 'Welcome to Our Blog'

  // Replace <br /> with actual line breaks for parsing
  heroHeadingContent = heroHeadingContent.replace(/<br\s*\/>/gi, '\n')

  // Split by newlines to create the heading parts
  const heroHeadingParts = heroHeadingContent.split('\n').filter((p: string) => p.trim() !== '')

  // Helper to render heading with underline decoration on the last part
  const renderHeroHeading = () => {
    if (heroHeadingParts.length === 0) return null

    const hasUnderlineImage = siteSettings.heroUnderlineImage?.src
    const lastPart = heroHeadingParts[heroHeadingParts.length - 1]

    return (
      <span>
        {heroHeadingParts.map((part: string, index: number) => {
          const isLast = index === heroHeadingParts.length - 1
          return (
            <span key={index}>
              {part}
              {!isLast && <br />}
            </span>
          )
        })}
        {hasUnderlineImage && (
          <span className="relative pr-3">
            <Image
              className="absolute -start-1 top-1/2 w-full -translate-y-1/2"
              src={siteSettings.heroUnderlineImage.src}
              alt="underline decoration"
              width={siteSettings.heroUnderlineImage.width || 200}
              height={siteSettings.heroUnderlineImage.height || 10}
            />
            <span className="relative text-primary-600">{lastPart}</span>
          </span>
        )}
      </span>
    )
  }

  return (
    <div className="relative container space-y-28 pb-28 lg:space-y-32 lg:pb-32">
      <SectionHero
        rightImg={siteSettings.heroImage?.src || rightImg}
        className="pt-14 lg:pt-20"
        heading={renderHeroHeading()}
        btnText={siteSettings.heroButtonText || 'Getting started'}
        btnHref={siteSettings.heroButtonUrl || '/submit-post'}
        subHeading={siteSettings.heroSubHeading || "Let stay at home and share with everyone the most beautiful stories in your hometown 🎈"}
      />

      <SectionSliderNewCategories
        heading={trendingTopics.heading}
        categoryCardType="card5"
        subHeading={trendingTopics.subHeading}
        categories={trendingTopics.categories}
      />

      <div className="relative py-16 lg:py-20">
        <BackgroundSection />
        <SectionSliderPosts
          postCardName="card7"
          heading={latestArticles.heading}
          subHeading={latestArticles.subHeading}
          posts={latestArticles.posts || posts.slice(0, 8)}
        />
      </div>

      <div>
        <HeadingWithSub subHeading={latestAudioArticles.subHeading}>{latestAudioArticles.heading}</HeadingWithSub>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {(latestAudioArticles.posts || audioPosts).slice(0, 3).map((p: TPost) => (
            <Card16Podcast key={p.id} post={p} />
          ))}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {(latestAudioArticles.posts || audioPosts).slice(3, 9).map((p: TPost) => (
                <Card15Podcast key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionAds
        label={advertisement.label}
        href={advertisement.url}
        imgAds={advertisement.image?.src || undefined}
        imgWidth={advertisement.image?.width}
        imgHeight={advertisement.image?.height}
      />

      <SectionMagazine4
        heading={lifestyles.heading}
        subHeading={lifestyles.subHeading}
        posts={lifestyles.tabs?.[0]?.posts || posts.slice(0, 8)}
        tabs={lifestyles.tabs?.length ? lifestyles.tabs.map(t => t.category.name) : undefined}
        tabPosts={lifestyles.tabs?.length ? Object.fromEntries(lifestyles.tabs.map(t => [t.category.name, t.posts])) : undefined}
      />

      <div className="relative py-16 lg:py-20">
        <BackgroundSection />
        <SectionSliderNewAuthors
          heading={topAuthors.heading}
          subHeading={topAuthors.subHeading}
          authors={topAuthors.authors || authors.slice(0, 10)}
        />
      </div>

      <SectionSubscribe2
        heading={newsletter.heading}
        description={newsletter.description}
        benefits={newsletter.benefits}
        placeholder={newsletter.placeholder}
        imgSrc={newsletter.image?.src || undefined}
        imgWidth={newsletter.image?.width}
        imgHeight={newsletter.image?.height}
      />

      <div className="relative py-16 lg:py-20">
        <BackgroundSection />
        <SectionSliderPosts
          postCardName="card9"
          heading={seaTravel.heading}
          subHeading={seaTravel.subHeading}
          posts={seaTravel.posts || posts.slice(0, 8)}
        />
      </div>

      <SectionVideos
        heading={videosSection.heading}
        subHeading={videosSection.subHeading}
        videos={videosSection.videos?.length ? videosSection.videos : undefined}
      />

      <SectionPostsWithWidgets
        postCardName="card14"
        gridClass="sm:grid-cols-2"
        posts={latestArticlesWithWidgets.posts || posts.slice(0, 8)}
        heading={latestArticlesWithWidgets.heading}
        subHeading={latestArticlesWithWidgets.subHeading}
        widgetCategories={latestArticlesWithWidgets.widgetCategories || categories.slice(0, 4)}
        widgetAuthors={latestArticlesWithWidgets.widgetAuthors || authors.slice(0, 3)}
        widgetPosts={latestArticlesWithWidgets.widgetPosts || posts.slice(0, 4)}
      />
    </div>
  )
}

export default Page
