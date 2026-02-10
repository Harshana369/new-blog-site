import imgAdsDef from '@/images/ads.png'
import { Link } from '@/shared/link'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { FC } from 'react'

interface Props {
  className?: string
  imgAds?: string | StaticImageData
  imgWidth?: number
  imgHeight?: number
  label?: string
  href?: string
}

const SectionAds: FC<Props> = ({ className, imgAds = imgAdsDef, imgWidth, imgHeight, label = '- Advertisement -', href = '/' }) => {
  const isExternal = typeof imgAds === 'string'

  return (
    <Link href={href} className={clsx('section-ads mx-auto block text-center', className)}>
      <span className="text-xs text-neutral-500">{label}</span>
      <Image
        className="mx-auto rounded-3xl"
        src={imgAds}
        alt="ads"
        sizes="(max-width: 1400px) 100vw, 90vw"
        {...(isExternal ? { width: imgWidth || 1920, height: imgHeight || 300 } : {})}
      />
    </Link>
  )
}

export default SectionAds
