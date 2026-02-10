import rightImgDefault from '@/images/SVG-subcribe2.png'
import { Badge } from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import Input from '@/shared/Input'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

const BADGE_COLORS = ['blue', 'red', 'green', 'yellow', 'purple', 'pink'] as const

interface Props {
  className?: string
  heading?: string
  description?: string
  benefits?: string[]
  placeholder?: string
  imgSrc?: string
  imgWidth?: number
  imgHeight?: number
}

const SectionSubscribe2: FC<Props> = ({
  className,
  heading = 'Join our newsletter 🎉',
  description = "Read and share new perspectives on just about any topic. Everyone's welcome.",
  benefits = ['Get more discount', 'Get premium magazines'],
  placeholder = 'Enter your email',
  imgSrc,
  imgWidth,
  imgHeight,
}) => {
  return (
    <div className={clsx('section-subscribe-2 relative flex flex-col items-center lg:flex-row', className)}>
      <div className="mb-14 shrink-0 lg:me-10 lg:mb-0 lg:w-2/5">
        <h2 className="text-4xl font-semibold">{heading}</h2>
        <span className="mt-6 block text-neutral-500 dark:text-neutral-400">
          {description}
        </span>
        {benefits.length > 0 && (
          <ul className="mt-10 space-y-5">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-x-4">
                <Badge color={BADGE_COLORS[index % BADGE_COLORS.length]}>{String(index + 1).padStart(2, '0')}</Badge>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">{benefit}</span>
              </li>
            ))}
          </ul>
        )}
        <form className="relative mt-10 max-w-sm" action={'#'} method="post">
          <Input required placeholder={placeholder} type="email" name="email" />
          <div className="absolute end-1 top-1/2 -translate-y-1/2">
            <ButtonCircle color="dark/white" type="submit">
              <ArrowRightIcon className="size-5 rtl:rotate-180" />
            </ButtonCircle>
          </div>
        </form>
      </div>
      <div className="grow">
        {imgSrc ? (
          <Image alt="newsletter" sizes="(max-width: 768px) 100vw, 50vw" src={imgSrc} width={imgWidth || 1920} height={imgHeight || 1080} />
        ) : (
          <Image alt="newsletter" sizes="(max-width: 768px) 100vw, 50vw" src={rightImgDefault} />
        )}
      </div>
    </div>
  )
}

export default SectionSubscribe2
