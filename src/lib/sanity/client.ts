import { createClient } from '@sanity/client'
import { sanityConfig } from './config'

export const client = createClient({
  ...sanityConfig,
  useCdn: true,
})

export const writeClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
