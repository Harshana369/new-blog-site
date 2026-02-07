'use client'

import dynamic from 'next/dynamic'

const SectionVideos = dynamic(() => import('@/components/SectionVideos'), {
  ssr: false,
})

export default SectionVideos
