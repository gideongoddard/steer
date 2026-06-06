import mixpanel from 'mixpanel-browser'

let initialized = false

export function initMixpanel(): void {
  if (initialized || typeof window === 'undefined') return
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!, {
    persistence: 'memory' as 'localStorage',
    track_pageview: true,
  })
  initialized = true
}

export { mixpanel }
