import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/utils/supabase/route-handler'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  const isPasswordReset = next === 'reset-password'
  const destination = isPasswordReset ? `${origin}/reset-password` : `${origin}/`
  const response = NextResponse.redirect(destination)

  if (code) {
    const supabase = createRouteHandlerClient(request, response)
    await supabase.auth.exchangeCodeForSession(code)

    if (isPasswordReset) {
      response.cookies.set('password_reset_pending', '1', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 10,
      })
    }
  }

  return response
}
