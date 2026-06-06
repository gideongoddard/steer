'use client'

// Standard 'mixpanel-browser' leaves RECORDER_FILENAME as a literal placeholder,
// causing a 404 fetch to cdn.mxpnl.com. This build has the real filename substituted.
import mixpanel from 'mixpanel-browser/dist/mixpanel-with-async-recorder.cjs'

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

export function identifyUser(userId: string) {
  mixpanel.identify(userId)
}
