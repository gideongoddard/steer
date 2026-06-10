'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { trackEvent } from '@/utils/mixpanel/server'

export type AuthState = { error?: string; success?: boolean; expired?: boolean }

function safeNext(next: FormDataEntryValue | null): string {
  if (typeof next === 'string' && next.startsWith('/') && !next.startsWith('//')) return next
  return '/'
}

export async function signUp(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const firstName = (formData.get('firstName') as string)?.trim()
  const lastName = (formData.get('lastName') as string)?.trim()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!firstName) return { error: 'First name is required.' }
  if (!lastName) return { error: 'Last name is required.' }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { first_name: firstName, last_name: lastName } },
  })

  if (error) {
    if (error.message === 'User already registered') {
      return { error: 'An account with this email already exists.' }
    }
    return { error: error.message }
  }

  if (data.user) {
    await trackEvent('sign_up_completed', data.user.id, { first_name: firstName })
  }

  redirect(safeNext(formData.get('next')))
}

export async function signIn(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'Invalid email or password.' }
  }

  redirect(safeNext(formData.get('next')))
}

export async function requestPasswordReset(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function resetPassword(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    if (error.message === 'Auth session missing!') {
      return { error: 'Your reset link has expired. Please request a new one.', expired: true }
    }
    return { error: error.message }
  }

  const cookieStore = await cookies()
  cookieStore.delete('password_reset_pending')
  redirect('/')
}

export async function signInWithGoogle(_: AuthState, formData: FormData): Promise<AuthState> {
  const next = formData.get('next')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const callbackUrl = new URL('/auth/callback', siteUrl)
  if (typeof next === 'string' && next.startsWith('/') && !next.startsWith('//')) {
    callbackUrl.searchParams.set('next', next)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: callbackUrl.toString() },
  })

  if (error) return { error: error.message }
  if (data.url) redirect(data.url)
  return { error: 'Could not connect to Google. Please try again.' }
}

export async function signOut(_: FormData): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/signin')
}
