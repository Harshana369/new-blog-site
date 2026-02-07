import clsx from 'clsx'
import type { TProductSpec } from '@/data/types'

interface ProductSpecTableProps {
  specifications: TProductSpec[]
  className?: string
}

export default function ProductSpecTable({
  specifications,
  className,
}: ProductSpecTableProps) {
  return (
    <div
      className={clsx(
        'overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700',
        className,
      )}
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
            <th className="px-4 py-3 font-semibold text-neutral-900 dark:text-neutral-100">
              Specification
            </th>
            <th className="px-4 py-3 font-semibold text-neutral-900 dark:text-neutral-100">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {specifications.map((spec, index) => (
            <tr
              key={spec.label}
              className={clsx(
                'border-b border-neutral-100 last:border-b-0 dark:border-neutral-800',
                index % 2 === 0
                  ? 'bg-white dark:bg-neutral-900'
                  : 'bg-neutral-50 dark:bg-neutral-900/50',
              )}
            >
              <td className="px-4 py-3 font-bold text-neutral-800 dark:text-neutral-200">
                {spec.label}
              </td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
