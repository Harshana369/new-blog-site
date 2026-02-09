import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

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

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<SanityWebhookBody>(req, secret)

    if (isValidSignature === false) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Missing _type in body' }, { status: 400 })
    }

    const tagsToRevalidate = tagMap[body._type] || ['posts']

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
