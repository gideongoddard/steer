'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signUp } from '../actions/auth'
import styles from '../auth.module.css'

export default function SignUpForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(signUp, {})

  return (
    <>
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
