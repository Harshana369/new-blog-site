import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

const secret = process.env.SANITY_REVALIDATION_SECRET

interface SanityWebhookBody {
  _type: string
  slug?: { current?: string }
}

const tagMap: Record<string, string[]> = {
  post: ['posts'],
  author: ['authors'],
  category: ['categories'],
  tag: ['tags'],
  product: ['posts'],
  siteSettings: ['posts', 'authors', 'categories', 'tags'],
}

function isValidSignature(body: string, signature: string): boolean {
  if (!secret) return false
  const hmac = createHmac('sha256', secret)
  hmac.update(body)
  const digest = hmac.digest('hex')
  return digest === signature
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-sanity-signature') || ''

    if (secret && secret !== 'your_revalidation_secret') {
      if (!isValidSignature(body, signature)) {
        return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
      }
    }

    const parsed: SanityWebhookBody = JSON.parse(body)
    const { _type } = parsed

    const tagsToRevalidate = tagMap[_type] || ['posts']

    for (const tag of tagsToRevalidate) {
      revalidateTag(tag)
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      now: Date.now(),
    })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
