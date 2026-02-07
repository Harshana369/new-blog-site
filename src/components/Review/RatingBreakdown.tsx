import clsx from 'clsx'
import type { TReviewRating } from '@/data/types'

interface RatingBreakdownProps {
  ratings: TReviewRating[]
  className?: string
}

function getBarColor(score: number): string {
  if (score >= 8) return 'bg-emerald-500 dark:bg-emerald-400'
  if (score >= 6) return 'bg-amber-500 dark:bg-amber-400'
  return 'bg-red-500 dark:bg-red-400'
}

export default function RatingBreakdown({
  ratings,
  className,
}: RatingBreakdownProps) {
  return (
    <div className={clsx('space-y-3', className)}>
      {ratings.map((rating) => {
        const percentage = (rating.score / 10) * 100

        return (
          <div key={rating.category} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {rating.category}
            </span>
            <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
              <div
                className={clsx(
                  'h-full rounded-full transition-all duration-300',
                  getBarColor(rating.score),
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              {rating.score}
            </span>
          </div>
        )
      })}
    </div>
  )
}
