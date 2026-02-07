import clsx from 'clsx'
import type { TAffiliateLink } from '@/data/types'

interface AffiliateButtonProps {
  link: TAffiliateLink
  className?: string
}

export default function AffiliateButton({
  link,
  className,
}: AffiliateButtonProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200',
        link.isPrimary
          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          : 'border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700',
        className,
      )}
    >
      <span>
        {link.isPrimary ? 'Buy at' : 'View at'} {link.store}
      </span>
      {link.price && (
        <span
          className={clsx(
            'rounded-md px-2 py-0.5 text-xs font-bold',
            link.isPrimary
              ? 'bg-blue-700/50 text-blue-100 dark:bg-blue-600/50'
              : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300',
          )}
        >
          {link.price}
        </span>
      )}
    </a>
  )
}
