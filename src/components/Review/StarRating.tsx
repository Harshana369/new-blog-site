import clsx from 'clsx'

interface StarRatingProps {
  score: number
  maxScore?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { star: 'w-4 h-4', text: 'text-sm', gap: 'gap-0.5' },
  md: { star: 'w-5 h-5', text: 'text-base', gap: 'gap-1' },
  lg: { star: 'w-7 h-7', text: 'text-lg', gap: 'gap-1.5' },
} as const

function StarIcon({
  fill,
  className,
}: {
  fill: 'full' | 'half' | 'empty'
  className?: string
}) {
  const id = `half-${Math.random().toString(36).slice(2, 9)}`

  if (fill === 'half') {
    return (
      <svg
        viewBox="0 0 20 20"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          fill={`url(#${id})`}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-amber-400"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        className={
          fill === 'full'
            ? 'fill-amber-400 text-amber-400'
            : 'fill-neutral-200 text-neutral-200 dark:fill-neutral-600 dark:text-neutral-600'
        }
      />
    </svg>
  )
}

export default function StarRating({
  score,
  maxScore = 10,
  size = 'md',
  className,
}: StarRatingProps) {
  const normalizedScore = Math.max(0, Math.min(score, maxScore))
  const starCount = 5
  const filledStars = (normalizedScore / maxScore) * starCount

  const stars: Array<'full' | 'half' | 'empty'> = []
  for (let i = 1; i <= starCount; i++) {
    if (filledStars >= i) {
      stars.push('full')
    } else if (filledStars >= i - 0.5) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }

  const s = sizeMap[size]

  return (
    <div
      className={clsx('inline-flex items-center', s.gap, className)}
      role="img"
      aria-label={`Rating: ${normalizedScore} out of ${maxScore}`}
    >
      <div className={clsx('flex items-center', s.gap)}>
        {stars.map((fill, index) => (
          <StarIcon key={index} fill={fill} className={s.star} />
        ))}
      </div>
      <span
        className={clsx(
          'font-semibold text-neutral-700 dark:text-neutral-200',
          s.text,
        )}
      >
        {normalizedScore}
      </span>
    </div>
  )
}
