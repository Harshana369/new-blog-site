import clsx from 'clsx'
import type { TProduct, TReviewData } from '@/data/types'

interface ReviewHeaderProps {
  product: TProduct
  reviewData: TReviewData
  className?: string
}

const badgeConfig: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  'editors-choice': {
    label: "Editor's Choice",
    bg: 'bg-amber-500',
    text: 'text-white',
  },
  'best-value': {
    label: 'Best Value',
    bg: 'bg-blue-500',
    text: 'text-white',
  },
  'best-performance': {
    label: 'Best Performance',
    bg: 'bg-purple-500',
    text: 'text-white',
  },
  'best-design': {
    label: 'Best Design',
    bg: 'bg-pink-500',
    text: 'text-white',
  },
  recommended: {
    label: 'Recommended',
    bg: 'bg-emerald-500',
    text: 'text-white',
  },
}

function getScoreColor(score: number): string {
  if (score >= 8) return 'bg-emerald-500'
  if (score >= 6) return 'bg-amber-500'
  return 'bg-red-500'
}

export default function ReviewHeader({
  product,
  reviewData,
  className,
}: ReviewHeaderProps) {
  const badge =
    reviewData.awardBadge && reviewData.awardBadge !== 'none'
      ? badgeConfig[reviewData.awardBadge]
      : null

  return (
    <div
      className={clsx(
        'rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800',
        className,
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left side: product info */}
        <div className="space-y-2">
          {product.brand && (
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {product.brand}
            </p>
          )}

          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            {product.price != null && (
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {product.currency ?? '$'}
                {product.price}
              </span>
            )}

            {badge && (
              <span
                className={clsx(
                  'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider',
                  badge.bg,
                  badge.text,
                )}
              >
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
                {badge.label}
              </span>
            )}
          </div>
        </div>

        {/* Right side: overall score */}
        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <div
            className={clsx(
              'flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20',
              getScoreColor(reviewData.overallScore),
            )}
          >
            <span className="text-2xl font-extrabold text-white sm:text-3xl">
              {reviewData.overallScore}
            </span>
          </div>
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Overall Score
          </span>
        </div>
      </div>
    </div>
  )
}
