'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-neutral-500 dark:text-neutral-400">
        An unexpected error occurred. Please try again.
      </p>
      <ButtonPrimary className="mt-8" onClick={reset}>
        Try again
      </ButtonPrimary>
    </div>
  )
}
