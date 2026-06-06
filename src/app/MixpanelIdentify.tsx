'use client'

import { useEffect } from 'react'
import { initMixpanel, mixpanel } from '@/utils/mixpanel/client'

export default function MixpanelIdentify({ userId }: { userId: string }) {
  useEffect(() => {
    initMixpanel()
    mixpanel.identify(userId)
  }, [userId])
  return null
}
