import ButtonPrimary from '@/shared/ButtonPrimary'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { FC, ReactNode } from 'react'

interface HeroImage {
  src: string
  alt?: string
  width?: number
  height?: number
}

interface Props {
  className?: string
  rightImg: string | StaticImageData | HeroImage
  heading: ReactNode
  subHeading: string
  btnText: string
  btnHref?: string
}

const SectionHero: FC<Props> = ({ className, rightImg, heading, subHeading, btnText, btnHref }) => {
  const isHeroImage = (img: unknown): img is HeroImage => typeof img === 'object' && img !== null && 'src' in img && typeof (img as HeroImage).src === 'string' && !('blurDataURL' in img)
  const defaultAlt = typeof heading === 'string' ? heading : 'Hero section illustration'
  const imgUrl = typeof rightImg === 'object' ? rightImg.src : rightImg
  const imgAlt = isHeroImage(rightImg) ? rightImg.alt || defaultAlt : defaultAlt
  const imgWidth = typeof rightImg === 'object' ? rightImg.width : undefined
  const imgHeight = typeof rightImg === 'object' ? rightImg.height : undefined

  return (
    <div className={clsx('section-hero relative', className)}>
      <div className="relative flex flex-col items-center gap-y-14 text-center lg:flex-row lg:gap-x-10 lg:gap-y-0 lg:text-left rtl:lg:text-right">
        <div className="w-screen max-w-full space-y-5 lg:space-y-7 xl:max-w-lg">
          <h2 className="text-3xl leading-tight font-semibold text-pretty md:text-4xl xl:text-5xl">{heading}</h2>
          <span className="block text-base text-neutral-600 xl:text-lg dark:text-neutral-400">{subHeading}</span>
          {!!btnText && <ButtonPrimary href={btnHref || '/'}>{btnText}</ButtonPrimary>}
        </div>
        <div className="grow">
          {imgWidth && imgHeight ? (
            <Image className="w-full" src={imgUrl} alt={imgAlt} width={imgWidth} height={imgHeight} />
          ) : (
            <img className="w-full" src={imgUrl} alt={imgAlt} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SectionHero
