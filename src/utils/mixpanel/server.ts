import Mixpanel from 'mixpanel'

export async function trackEvent(
  event: string,
  distinctId: string,
  properties: Record<string, unknown> = {}
): Promise<void> {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
  if (!token) {
    console.error('[Mixpanel] token missing')
    return
  }

  const mp = Mixpanel.init(token)

  await new Promise<void>((resolve) => {
    mp.track(event, { distinct_id: distinctId, ...properties }, (err) => {
      if (err) console.error('[Mixpanel] error:', err)
      else console.log('[Mixpanel] tracked:', event)
      resolve()
    })
  })
}
