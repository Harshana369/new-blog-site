'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'
import { Link } from '@/shared/link'

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-bold">Post not available</h1>
      <p className="mt-4 text-neutral-500 dark:text-neutral-400">
        We could not load this post. It may have been removed or there was a temporary error.
      </p>
      <div className="mt-8 flex gap-4">
        <ButtonPrimary onClick={reset}>Try again</ButtonPrimary>
        <Link href="/" className="inline-flex items-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
          Go home
        </Link>
      </div>
    </div>
  )
}
