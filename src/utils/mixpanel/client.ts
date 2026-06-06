'use client'

import mixpanel from 'mixpanel-browser'

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

export function initMixpanel() {
  if (!token) return
  mixpanel.init(token, {
    autocapture: true,
    record_sessions_percent: 100,
    api_host: 'https://api-eu.mixpanel.com',
    persistence: 'localStorage',
  })
}
