import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/utils/supabase/route-handler'
import { trackEvent } from '@/utils/mixpanel/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  const isPasswordReset = next === 'reset-password'
  const destination = isPasswordReset ? `${origin}/reset-password` : `${origin}/`
  const response = NextResponse.redirect(destination)

  if (code) {
    const supabase = createRouteHandlerClient(request, response)
    const { data: { user } } = await supabase.auth.exchangeCodeForSession(code)

    if (isPasswordReset) {
      response.cookies.set('password_reset_pending', '1', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 10,
      })
    } else if (user) {
      const isNewUser = Date.now() - new Date(user.created_at).getTime() < 10_000

      if (isNewUser) {
        const meta = user.user_metadata
        const firstName = (meta.given_name ?? meta.full_name?.split(' ')[0] ?? '').trim()
        const lastName = (meta.family_name ?? meta.full_name?.split(' ').slice(1).join(' ') ?? '').trim()
        if (firstName || lastName) {
          await supabase.from('profiles').update({ first_name: firstName, last_name: lastName }).eq('user_id', user.id)
        }
      }

      await trackEvent(
        isNewUser ? 'sign_up_completed' : 'sign_in_completed',
        user.id,
        { method: 'google' }
      )
    }
  }

  return response
}
