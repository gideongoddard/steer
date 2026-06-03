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
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
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
