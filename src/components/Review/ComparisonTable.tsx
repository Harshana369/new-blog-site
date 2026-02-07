import clsx from 'clsx'
import Image from 'next/image'
import type { TProduct } from '@/data/types'
import StarRating from './StarRating'

interface ComparisonTableProps {
  products: TProduct[]
  className?: string
}

export default function ComparisonTable({
  products,
  className,
}: ComparisonTableProps) {
  if (products.length === 0) return null

  // Collect all unique spec labels across all products
  const allSpecLabels: string[] = []
  const seenLabels = new Set<string>()
  for (const product of products) {
    if (product.specifications) {
      for (const spec of product.specifications) {
        if (!seenLabels.has(spec.label)) {
          seenLabels.add(spec.label)
          allSpecLabels.push(spec.label)
        }
      }
    }
  }

  // Build a lookup map: product id -> label -> value
  const specMap = new Map<string, Map<string, string>>()
  for (const product of products) {
    const labelMap = new Map<string, string>()
    if (product.specifications) {
      for (const spec of product.specifications) {
        labelMap.set(spec.label, spec.value)
      }
    }
    specMap.set(product.id, labelMap)
  }

  return (
    <div
      className={clsx(
        'overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700',
        className,
      )}
    >
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
            <th className="sticky left-0 z-10 bg-neutral-100 px-4 py-3 font-semibold text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
              Feature
            </th>
            {products.map((product) => (
              <th
                key={product.id}
                className="px-4 py-3 text-center font-semibold text-neutral-900 dark:text-neutral-100"
              >
                <div className="flex flex-col items-center gap-2">
                  {product.images && product.images.length > 0 && (
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  )}
                  <span>{product.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Price row */}
          <tr className="border-b border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-900">
            <td className="sticky left-0 z-10 bg-white px-4 py-3 font-bold text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
              Price
            </td>
            {products.map((product) => (
              <td
                key={product.id}
                className="px-4 py-3 text-center text-neutral-600 dark:text-neutral-400"
              >
                {product.price != null
                  ? `${product.currency ?? '$'}${product.price}`
                  : '--'}
              </td>
            ))}
          </tr>

          {/* Rating row */}
          <tr className="border-b border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
            <td className="sticky left-0 z-10 bg-neutral-50 px-4 py-3 font-bold text-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-200">
              Rating
            </td>
            {products.map((product) => (
              <td
                key={product.id}
                className="px-4 py-3 text-center"
              >
                {product.reviewScore != null ? (
                  <div className="flex justify-center">
                    <StarRating score={product.reviewScore} size="sm" />
                  </div>
                ) : (
                  <span className="text-neutral-400 dark:text-neutral-500">
                    --
                  </span>
                )}
              </td>
            ))}
          </tr>

          {/* Spec rows */}
          {allSpecLabels.map((label, index) => (
            <tr
              key={label}
              className={clsx(
                'border-b border-neutral-100 last:border-b-0 dark:border-neutral-800',
                index % 2 === 0
                  ? 'bg-white dark:bg-neutral-900'
                  : 'bg-neutral-50 dark:bg-neutral-900/50',
              )}
            >
              <td
                className={clsx(
                  'sticky left-0 z-10 px-4 py-3 font-bold text-neutral-800 dark:text-neutral-200',
                  index % 2 === 0
                    ? 'bg-white dark:bg-neutral-900'
                    : 'bg-neutral-50 dark:bg-neutral-900/50',
                )}
              >
                {label}
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-4 py-3 text-center text-neutral-600 dark:text-neutral-400"
                >
                  {specMap.get(product.id)?.get(label) ?? '--'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
