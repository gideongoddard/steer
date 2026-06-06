'use client'

import { useEffect } from 'react'
import { initMixpanel } from '@/utils/mixpanel/client'

export default function MixpanelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initMixpanel()
  }, [])
  return <>{children}</>
}
