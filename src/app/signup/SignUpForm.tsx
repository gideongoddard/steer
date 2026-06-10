'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signUp, signInWithGoogle } from '../actions/auth'
import styles from '../auth.module.css'

export default function SignUpForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(signUp, {})
  const [googleState, googleAction, googlePending] = useActionState(signInWithGoogle, {})

  return (
    <>
      <form action={googleAction}>
        {next && <input type="hidden" name="next" value={next} />}
        <button type="submit" className={styles.googleButton} disabled={googlePending}>
          <GoogleIcon />
          {googlePending ? 'Redirecting...' : 'Continue with Google'}
        </button>
      </form>
      {googleState?.error && <p className={styles.error} aria-live="polite">{googleState.error}</p>}

      <div className={styles.divider}><span>or</span></div>

      <form action={action} className={styles.form}>
        {next && <input type="hidden" name="next" value={next} />}
        <div className={styles.field}>
          <label htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" type="text" autoComplete="given-name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" type="text" autoComplete="family-name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="new-password" required />
        </div>
        <button type="submit" className={styles.button} disabled={pending}>
          {pending ? 'Signing up...' : 'Sign up'}
        </button>
        <p className={styles.error} aria-live="polite">{state?.error}</p>
      </form>
      <p className={styles.footer}>
        Already have an account? <Link href={next ? `/signin?next=${encodeURIComponent(next)}` : '/signin'}>Sign in</Link>
      </p>
    </>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
