'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { resetPassword } from '../actions/auth'
import styles from '../auth.module.css'

export default function ResetPasswordForm() {
  const [state, action, pending] = useActionState(resetPassword, {})
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const confirmTouched = confirmPassword.length > 0
  const passwordsMatch = password === confirmPassword

  if (state.expired) {
    return (
      <p className={styles.footer}>
        Your reset link has expired.{' '}
        <Link href="/forgot-password">Request a new one</Link>
      </p>
    )
  }

  return (
    <form action={action} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="password">New password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="confirmPassword">Confirm new password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className={confirmTouched ? (passwordsMatch ? styles.inputSuccess : styles.inputError) : ''}
        />
        {confirmTouched && (
          <span className={passwordsMatch ? styles.fieldSuccess : styles.fieldError}>
            {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
          </span>
        )}
      </div>
      <button
        type="submit"
        className={styles.button}
        disabled={pending || (confirmTouched && !passwordsMatch)}
      >
        {pending ? 'Updating...' : 'Update password'}
      </button>
      <p className={styles.error} aria-live="polite">{state?.error}</p>
    </form>
  )
}
