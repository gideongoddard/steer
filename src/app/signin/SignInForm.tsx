'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signIn } from '../actions/auth'
import styles from '../auth.module.css'

export default function SignInForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(signIn, {})

  return (
    <>
      <form action={action} className={styles.form}>
        {next && <input type="hidden" name="next" value={next} />}
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button type="submit" className={styles.button} disabled={pending}>
          {pending ? 'Signing in...' : 'Sign in'}
        </button>
        <p className={styles.error} aria-live="polite">{state?.error}</p>
      </form>
      <p className={styles.forgotPassword}>
        <Link href="/forgot-password">Forgot password?</Link>
      </p>
      <p className={styles.footer}>
        Don&apos;t have an account? <Link href={next ? `/signup?next=${encodeURIComponent(next)}` : '/signup'}>Sign up</Link>
      </p>
    </>
  )
}
