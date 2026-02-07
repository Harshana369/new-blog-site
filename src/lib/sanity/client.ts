import { createClient, type SanityClient } from '@sanity/client'
import { sanityConfig } from './config'

let _client: SanityClient | null = null
let _writeClient: SanityClient | null = null

export const client = new Proxy({} as SanityClient, {
  get(_, prop) {
    if (!_client) {
      _client = createClient({
        ...sanityConfig,
        useCdn: true,
      })
    }
    const value = (_client as any)[prop]
    return typeof value === 'function' ? value.bind(_client) : value
  },
})

export const writeClient = new Proxy({} as SanityClient, {
  get(_, prop) {
    if (!_writeClient) {
      _writeClient = createClient({
        ...sanityConfig,
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
      })
    }
    const value = (_writeClient as any)[prop]
    return typeof value === 'function' ? value.bind(_writeClient) : value
  },
})
