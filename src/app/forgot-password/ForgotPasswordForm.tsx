'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { requestPasswordReset } from '../actions/auth'
import styles from '../auth.module.css'

export default function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, {})

  if (state.success) {
    return (
      <p className={styles.footer}>
        Check your email for a reset link.{' '}
        <Link href="/signin">Back to sign in</Link>
      </p>
    )
  }

  return (
    <>
      <form action={action} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <button type="submit" className={styles.button} disabled={pending}>
          {pending ? 'Sending...' : 'Send reset link'}
        </button>
        <p className={styles.error} aria-live="polite">{state?.error}</p>
      </form>
      <p className={styles.footer}>
        <Link href="/signin">Back to sign in</Link>
      </p>
    </>
  )
}
