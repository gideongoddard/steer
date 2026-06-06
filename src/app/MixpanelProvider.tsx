'use client'

import { useEffect } from 'react'
import { initMixpanel, identifyUser } from '@/utils/mixpanel/client'

export default function MixpanelProvider({ children, userId }: { children: React.ReactNode; userId?: string }) {
  useEffect(() => {
    initMixpanel()
    if (userId) identifyUser(userId)
  }, [userId])
  return <>{children}</>
}
