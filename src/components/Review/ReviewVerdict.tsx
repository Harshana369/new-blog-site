import clsx from 'clsx'
import type { TReviewData } from '@/data/types'

interface ReviewVerdictProps {
  reviewData: TReviewData
  className?: string
}

const badgeStyles: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  'editors-choice': {
    label: "Editor's Choice",
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border-amber-300 dark:border-amber-700',
  },
  'best-value': {
    label: 'Best Value',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    text: 'text-blue-800 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-700',
  },
  'best-performance': {
    label: 'Best Performance',
    bg: 'bg-purple-100 dark:bg-purple-900/40',
    text: 'text-purple-800 dark:text-purple-300',
    border: 'border-purple-300 dark:border-purple-700',
  },
  'best-design': {
    label: 'Best Design',
    bg: 'bg-pink-100 dark:bg-pink-900/40',
    text: 'text-pink-800 dark:text-pink-300',
    border: 'border-pink-300 dark:border-pink-700',
  },
  recommended: {
    label: 'Recommended',
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
    text: 'text-emerald-800 dark:text-emerald-300',
    border: 'border-emerald-300 dark:border-emerald-700',
  },
}

function getScoreColor(score: number): string {
  if (score >= 8) return 'text-emerald-600 dark:text-emerald-400'
  if (score >= 6) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

function getScoreRingColor(score: number): string {
  if (score >= 8) return 'border-emerald-500 dark:border-emerald-400'
  if (score >= 6) return 'border-amber-500 dark:border-amber-400'
  return 'border-red-500 dark:border-red-400'
}

export default function ReviewVerdict({
  reviewData,
  className,
}: ReviewVerdictProps) {
  const badge =
    reviewData.awardBadge && reviewData.awardBadge !== 'none'
      ? badgeStyles[reviewData.awardBadge]
      : null

  return (
    <div
      className={clsx(
        'rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-800/50',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        {/* Score circle */}
        <div
          className={clsx(
            'flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4',
            getScoreRingColor(reviewData.overallScore),
          )}
        >
          <span
            className={clsx(
              'text-3xl font-extrabold',
              getScoreColor(reviewData.overallScore),
            )}
          >
            {reviewData.overallScore}
          </span>
        </div>

        {/* Verdict text and badge */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Our Verdict
          </h3>

          {badge && (
            <span
              className={clsx(
                'mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider',
                badge.bg,
                badge.text,
                badge.border,
              )}
            >
              <svg
                className="h-3.5 w-3.5"
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

          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            {reviewData.verdict}
          </p>
        </div>
      </div>
    </div>
  )
}
