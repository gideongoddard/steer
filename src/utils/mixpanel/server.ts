export async function trackEvent(
  event: string,
  distinctId: string,
  properties: Record<string, unknown> = {}
): Promise<void> {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
  if (!token) return

  const payload = JSON.stringify([{
    event,
    properties: { token, distinct_id: distinctId, ...properties },
  }])

  try {
    await fetch('https://api.mixpanel.com/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${Buffer.from(payload).toString('base64')}`,
    })
  } catch {
    // Never let analytics failures break the app
  }
}
