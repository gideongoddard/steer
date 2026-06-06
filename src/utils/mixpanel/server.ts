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

  const payload = JSON.stringify([{
    event,
    properties: { token, distinct_id: distinctId, ...properties },
  }])

  try {
    const res = await fetch('https://api-eu.mixpanel.com/track?verbose=1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(Buffer.from(payload).toString('base64'))}`,
    })
    const body = await res.text()
    console.log('[Mixpanel]', event, res.status, body)
  } catch (err) {
    console.error('[Mixpanel] fetch error:', err)
  }
}
