import clsx from 'clsx'

interface ProsConsListProps {
  pros: string[]
  cons: string[]
  className?: string
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-red-500 dark:text-red-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function ProsConsList({
  pros,
  cons,
  className,
}: ProsConsListProps) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-6 md:grid-cols-2',
        className,
      )}
    >
      {/* Pros */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-800 dark:bg-emerald-950/30">
        <h3 className="mb-3 text-lg font-bold text-emerald-700 dark:text-emerald-400">
          Pros
        </h3>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckIcon />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {pro}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-xl border border-red-200 bg-red-50/50 p-5 dark:border-red-800 dark:bg-red-950/30">
        <h3 className="mb-3 text-lg font-bold text-red-700 dark:text-red-400">
          Cons
        </h3>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2">
              <XIcon />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {con}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
