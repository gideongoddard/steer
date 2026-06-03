'use client'

import { useActionState } from 'react'
import { createList } from '../../actions/lists'
import styles from '../../auth.module.css'

export default function CreateListForm() {
  const [state, action, pending] = useActionState(createList, {})

  return (
    <form action={action} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name">List name</label>
        <input id="name" name="name" type="text" required autoFocus maxLength={100} />
      </div>
      <button type="submit" className={styles.button} disabled={pending}>
        {pending ? 'Creating...' : 'Create list'}
      </button>
      <p className={styles.error} aria-live="polite">{state?.error}</p>
    </form>
  )
}
