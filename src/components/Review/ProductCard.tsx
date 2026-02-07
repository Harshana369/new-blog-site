import clsx from 'clsx'
import Image from 'next/image'
import type { TProduct } from '@/data/types'
import StarRating from './StarRating'
import AffiliateButton from './AffiliateButton'

interface ProductCardProps {
  product: TProduct
  className?: string
}

export default function ProductCard({
  product,
  className,
}: ProductCardProps) {
  const primaryImage = product.images?.[0]

  return (
    <div
      className={clsx(
        'overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800',
        className,
      )}
    >
      {/* Product image */}
      {primaryImage && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-700">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            width={primaryImage.width}
            height={primaryImage.height}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Product info */}
      <div className="space-y-3 p-5">
        {product.brand && (
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {product.brand}
          </p>
        )}

        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {product.name}
        </h3>

        {product.price != null && (
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {product.currency ?? '$'}
            {product.price}
          </p>
        )}

        {product.reviewScore != null && (
          <div className="pt-1">
            <StarRating score={product.reviewScore} size="md" />
          </div>
        )}

        {/* Affiliate links */}
        {product.affiliateLinks && product.affiliateLinks.length > 0 && (
          <div className="flex flex-col gap-2 pt-2">
            {product.affiliateLinks.map((link) => (
              <AffiliateButton
                key={link.store}
                link={link}
                className="w-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
